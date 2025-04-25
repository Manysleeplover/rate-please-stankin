package ru.romanov.stankin.authorization_service.service

import org.slf4j.LoggerFactory.getLogger
import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.dto.schedule.DailyScheduleDTO
import ru.romanov.stankin.authorization_service.domain.dto.schedule.ScheduleDto
import ru.romanov.stankin.authorization_service.domain.dto.schedule.SemesterScheduleDTO
import ru.romanov.stankin.authorization_service.domain.entity.DailyScheduleEntity
import ru.romanov.stankin.authorization_service.domain.entity.SemesterScheduleEntity
import ru.romanov.stankin.authorization_service.util.mapToEntity
import ru.romanov.stankin.authorization_service.util.mapToDto
import ru.romanov.stankin.authorization_service.repository.DailyScheduleRepository
import ru.romanov.stankin.authorization_service.repository.SemesterScheduleRepository
import ru.romanov.stankin.authorization_service.util.LAB_TIMES_MAP
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit

@Service
class ScheduleSaverService(
    private val semesterScheduleRepository: SemesterScheduleRepository,
    private val dailyScheduleRepository: DailyScheduleRepository,
) {

    fun processSchedule(listOfSubjects: List<ScheduleDto>): SemesterScheduleDTO {
        val dailyScheduleDTOList = expandSchedule(listOfSubjects)
        val dailyScheduleEntityList = dailyScheduleDTOList.mapToEntity()
        return dailyScheduleEntityList
            .buildSemesterSchedule()
            .also {
                log.info("Расписание для группы ${it.stgroup} за ${it.firstClassDate}-${it.lastClassDate} успешно собрано")
            }
            .validateIdempotency()
            .also {
                log.info("Расписание для группы ${it.stgroup} за ${it.firstClassDate}-${it.lastClassDate} прошло проверку на идемпотентность")
            }
            .also {
                dailyScheduleEntityList.forEach { entity -> entity.semesterSchedule = it}
                it.dailyScheduleEntity = dailyScheduleEntityList
            }
            .saveSemesterSchedule()
            .also {
                log.info("Расписание для группы ${it.stgroup} за ${it.firstClassDate}-${it.lastClassDate} сохранено в БД")
            }
            .mapToDto(dailyScheduleDTOList)
    }

    private fun SemesterScheduleEntity.saveSemesterSchedule() =
        semesterScheduleRepository.save(this)

    private fun List<DailyScheduleEntity>.buildSemesterSchedule() =
        SemesterScheduleEntity(
        stgroup = this.first().stgroup,
        firstClassDate =  this.stream().map { it.date }.min(Comparator.comparing { it }).get(),
        lastClassDate =  this.stream().map { it.date }.max(Comparator.comparing { it }).get(),
    )

    fun List<DailyScheduleEntity>.saveDailySchedule(): List<DailyScheduleEntity> =
        dailyScheduleRepository.saveAll(this)

    private fun expandSchedule(scheduleList: List<ScheduleDto>): List<DailyScheduleDTO> {
        val result = mutableListOf<DailyScheduleDTO>()
        val dateFormatter = DateTimeFormatter.ofPattern("dd.MM")

        // Для отслеживания уже добавленных лабораторных работ
        val addedLabs = mutableSetOf<Pair<String, LocalDate>>() // subject to date

        scheduleList.forEach { schedule ->
            // 1. Обработка периодических занятий
            schedule.periods.forEach { period ->
                try {
                    val startDate = parseDateWithDefaultYear(period.startDate, dateFormatter)
                    val endDate = parseDateWithDefaultYear(period.endDate, dateFormatter)

                    var currentDateInPeriod = startDate
                    while (!currentDateInPeriod.isAfter(endDate)) {
                        val weeksBetween = ChronoUnit.WEEKS.between(startDate, currentDateInPeriod).toInt()
                        val isWeekEven = weeksBetween % 2 == 0

                        val shouldAdd = when (period.repeat?.lowercase()) {
                            "к.н." -> true
                            "ч.н." -> isWeekEven
                            "н.н." -> !isWeekEven
                            else -> true
                        }

                        if (shouldAdd) {
                            if (schedule.type == "лабораторные занятия") {
                                val key = schedule.subject to currentDateInPeriod
                                if (!addedLabs.contains(key)) {
                                    result.add(createDailySchedule(schedule, currentDateInPeriod, LAB_TIMES_MAP[schedule.start_time]!!))
                                    addedLabs.add(key)
                                }
                            } else {
                                result.add(createDailySchedule(schedule, currentDateInPeriod))
                            }
                        }
                        currentDateInPeriod = currentDateInPeriod.plusWeeks(1)
                    }
                } catch (e: Exception) {
                    println("Error processing period: ${e.message}")
                }
            }

            // 2. Обработка отдельных дат
            schedule.dates.forEach { dateStr ->
                try {
                    val date = parseDateWithDefaultYear(dateStr, dateFormatter)
                    if (schedule.type == "лабораторные занятия") {
                        val key = schedule.subject to date
                        if (!addedLabs.contains(key)) {
                            result.add(createDailySchedule(schedule, date, LAB_TIMES_MAP[schedule.start_time]!!))
                            addedLabs.add(key)
                        }
                    } else {
                        result.add(createDailySchedule(schedule, date))
                    }
                } catch (e: Exception) {
                    println("Error processing date $dateStr: ${e.message}")
                }
            }
        }

        // Убрал фильтрацию по текущей дате
        return result.sortedWith(compareBy({ it.date }, { it.startTime }))
    }

    private fun createDailySchedule(schedule: ScheduleDto, date: LocalDate): DailyScheduleDTO {
        return DailyScheduleDTO(
            date = date,
            stgroup = schedule.stgroup,
            subject = schedule.subject,
            audience = schedule.audience,
            startTime = schedule.start_time,
            endTime = schedule.end_time,
            subgroup = schedule.group,
            teacher = schedule.teacher,
            type = schedule.type
        )
    }

    private fun createDailySchedule(schedule: ScheduleDto, date: LocalDate, endTime: String): DailyScheduleDTO {
        return DailyScheduleDTO(
            date = date,
            stgroup = schedule.stgroup,
            subject = schedule.subject,
            audience = schedule.audience,
            startTime = schedule.start_time,
            endTime = endTime,
            subgroup = schedule.group,
            teacher = schedule.teacher,
            type = schedule.type
        )
    }

    private fun parseDateWithDefaultYear(dateStr: String, formatter: DateTimeFormatter): LocalDate {
        val currentYear = LocalDate.now().year
        return LocalDate.parse("$dateStr.$currentYear", DateTimeFormatter.ofPattern("dd.MM.yyyy"))
    }

    private fun SemesterScheduleEntity.validateIdempotency( ): SemesterScheduleEntity =
        if ( semesterScheduleRepository.findByFirstClassDateAndLastClassDateAndStgroupAndVersionDate(
                firstClassDate =   this.firstClassDate,
                lastClassDate =  this.lastClassDate,
                stgroup =  this.stgroup,
                versionDate =  this.versionDate
            ).isEmpty()
        ) {
            this
        } else {
            throw RuntimeException(
                "Расписание с таким номером версии ${this.versionDate}, группы: ${this.stgroup}, " +
                        "с временным диапазоном семестра ${this.firstClassDate} - ${this.lastClassDate} уже существует")
        }

    companion object {
        private val log = getLogger(ScheduleSaverService::class.java)
    }
}

