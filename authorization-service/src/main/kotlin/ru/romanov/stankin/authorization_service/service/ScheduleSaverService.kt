package ru.romanov.stankin.authorization_service.service

import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.dto.DailyScheduleDTO
import ru.romanov.stankin.authorization_service.domain.dto.ScheduleDto
import ru.romanov.stankin.authorization_service.domain.dto.SemesterScheduleDTO
import ru.romanov.stankin.authorization_service.domain.entity.mongo.DailySchedule
import ru.romanov.stankin.authorization_service.domain.entity.mongo.SemesterSchedule
import ru.romanov.stankin.authorization_service.domain.mapToDailyScheduleEntity
import ru.romanov.stankin.authorization_service.domain.mapToSemesterScheduleDto
import ru.romanov.stankin.authorization_service.repository.mongo.DailyScheduleRepository
import ru.romanov.stankin.authorization_service.repository.mongo.SemesterScheduleRepository
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoField

@Service
class ScheduleSaverService(
    private val semesterScheduleRepository: SemesterScheduleRepository,
    private val dailyScheduleRepository: DailyScheduleRepository,
) {

    fun processSchedule(listOfSubjects: List<ScheduleDto>): SemesterScheduleDTO {
        val dailyScheduleDTOList = expandSchedule(listOfSubjects)
        return dailyScheduleDTOList
            .mapToDailyScheduleEntity()
            .saveDailySchedule()
            .buildSemesterSchedule()
            .saveSemesterSchedule()
            .mapToSemesterScheduleDto(dailyScheduleDTOList)
    }

    fun SemesterSchedule.saveSemesterSchedule() =
        semesterScheduleRepository.save(this)

    fun List<DailySchedule>.buildSemesterSchedule() =
        SemesterSchedule(
        stgroup = this.first().stgroup!!,
        firstClassDate =  this.stream().map { it.date }.min(Comparator.comparing { it }).get(),
        lastClassDate =  this.stream().map { it.date }.max(Comparator.comparing { it }).get(),
    )

    fun List<DailySchedule>.saveDailySchedule(): List<DailySchedule> =
        dailyScheduleRepository.saveAll(this)

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
                            group = schedule.group,
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
                        group = schedule.group,
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
}

