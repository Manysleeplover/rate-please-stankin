package ru.romanov.stankin.authorization_service.service

import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.dto.DailySchedule
import ru.romanov.stankin.authorization_service.domain.dto.FullScheduleDTO
import ru.romanov.stankin.authorization_service.domain.dto.ScheduleDto
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoField

@Service
class ScheduleService {

    fun processSchedule(listOfSubjects: List<ScheduleDto>): List<DailySchedule>{
       return expandSchedule(listOfSubjects)
    }

    // Функция для разворачивания расписания
    fun expandSchedule(scheduleList: List<ScheduleDto>): List<DailySchedule> {
        val dailySchedules = mutableListOf<DailySchedule>()
        val dateFormatter = DateTimeFormatter.ofPattern("dd.MM")

        for (schedule in scheduleList) {
            // Обработка периодов
            schedule.periods?.forEach { period ->
                val startDate = parseDateWithDefaultYear(period.startDate, dateFormatter)
                val endDate = parseDateWithDefaultYear(period.endDate, dateFormatter)

                var currentDate = startDate
                while (!currentDate.isAfter(endDate)) {
                    dailySchedules.add(
                        DailySchedule(
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
                dailySchedules.add(
                    DailySchedule(
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
        return dailySchedules.sortedWith(compareBy({ it.date }, { it.startTime }))
    }

    fun parseDateWithDefaultYear(dateStr: String, formatter: DateTimeFormatter): LocalDate {
        val temporalAccessor = formatter.parse(dateStr)
        val year = LocalDate.now().year // Используем текущий год
        return LocalDate.of(year, temporalAccessor.get(ChronoField.MONTH_OF_YEAR), temporalAccessor.get(ChronoField.DAY_OF_MONTH))
    }
}
