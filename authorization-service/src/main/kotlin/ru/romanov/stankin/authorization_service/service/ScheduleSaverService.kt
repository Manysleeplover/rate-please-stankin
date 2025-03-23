package ru.romanov.stankin.authorization_service.service

import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.dto.DailyScheduleDTO
import ru.romanov.stankin.authorization_service.domain.dto.ScheduleDto
import ru.romanov.stankin.authorization_service.domain.dto.SemesterScheduleDTO
import ru.romanov.stankin.authorization_service.domain.entity.postgres.DailySchedule
import ru.romanov.stankin.authorization_service.domain.entity.postgres.SemesterSchedule
import ru.romanov.stankin.authorization_service.util.mapToEntity
import ru.romanov.stankin.authorization_service.util.mapToDto
import ru.romanov.stankin.authorization_service.repository.postgre.PostgresDailyScheduleRepository
import ru.romanov.stankin.authorization_service.repository.postgre.PostgresSemesterScheduleRepository
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoField

@Service
class ScheduleSaverService(
    private val postgresSemesterScheduleRepository: PostgresSemesterScheduleRepository,
    private val postgresDailyScheduleRepository: PostgresDailyScheduleRepository,
) {

    fun processSchedule(listOfSubjects: List<ScheduleDto>): SemesterScheduleDTO {
        val dailyScheduleDTOList = expandSchedule(listOfSubjects)
        val dailyScheduleEntityList = dailyScheduleDTOList.mapToEntity()
        return dailyScheduleEntityList
            .buildSemesterSchedule()
            .validateIdempotency()
            .also {
                dailyScheduleEntityList.forEach { entity -> entity.semesterSchedule = it}
                it.dailySchedule = dailyScheduleEntityList
            }
            .saveSemesterSchedule()
            .mapToDto(dailyScheduleDTOList)
    }

    fun SemesterSchedule.saveSemesterSchedule() =
        postgresSemesterScheduleRepository.save(this)

    fun List<DailySchedule>.buildSemesterSchedule() =
        SemesterSchedule(
        stgroup = this.first().stgroup!!,
        firstClassDate =  this.stream().map { it.date }.min(Comparator.comparing { it }).get(),
        lastClassDate =  this.stream().map { it.date }.max(Comparator.comparing { it }).get(),
    )

    fun List<DailySchedule>.saveDailySchedule(): List<DailySchedule> =
        postgresDailyScheduleRepository.saveAll(this)

    // Функция для разворачивания расписания
    private fun expandSchedule(scheduleList: List<ScheduleDto>): List<DailyScheduleDTO> {
        val dailyScheduleDTOS = mutableListOf<DailyScheduleDTO>()
        val dateFormatter = DateTimeFormatter.ofPattern("dd.MM")

        for (schedule in scheduleList) {
            // Обработка периодов
            schedule.periods?.forEach { period ->
                val startDate = parseDateWithDefaultYear(period.startDate, dateFormatter)
                val endDate = parseDateWithDefaultYear(period.endDate, dateFormatter)

                var currentDate = startDate
                while (!currentDate.isAfter(endDate)) {
                    dailyScheduleDTOS.add(
                        DailyScheduleDTO(
                            date = currentDate,
                            stgroup = schedule.stgroup,
                            subject = schedule.subject,
                            audience = schedule.audience,
                            startTime = schedule.start_time,
                            endTime = schedule.end_time,
                            subgroup = schedule.group,
                            teacher = schedule.teacher,
                            type = schedule.type
                        )
                    )
                    currentDate = currentDate.plusWeeks(1) // Повтор каждую неделю
                }
            }

            // Обработка отдельных дат
            schedule.dates?.forEach { dateStr ->
                val date = parseDateWithDefaultYear(dateStr, dateFormatter)
                dailyScheduleDTOS.add(
                    DailyScheduleDTO(
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
                )
            }
        }

        // Сортировка по дате и времени
        return dailyScheduleDTOS.sortedWith(compareBy({ it.date }, { it.startTime }))
    }

    private fun parseDateWithDefaultYear(dateStr: String, formatter: DateTimeFormatter): LocalDate {
        val temporalAccessor = formatter.parse(dateStr)
        val year = LocalDate.now().year // Используем текущий год
        return LocalDate.of(year, temporalAccessor.get(ChronoField.MONTH_OF_YEAR), temporalAccessor.get(ChronoField.DAY_OF_MONTH))
    }

    private fun SemesterSchedule.validateIdempotency( ): SemesterSchedule =
        if ( postgresSemesterScheduleRepository.findByFirstClassDateAndLastClassDateAndStgroupAndVersionDate(
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
}

