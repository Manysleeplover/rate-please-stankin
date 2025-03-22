package ru.romanov.stankin.authorization_service.service

import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.dto.ScheduleDateIntervalRequest
import ru.romanov.stankin.authorization_service.domain.entity.postgres.DailySchedule
import ru.romanov.stankin.authorization_service.domain.entity.postgres.SemesterSchedule
import ru.romanov.stankin.authorization_service.repository.postgre.PostgresDailyScheduleRepository
import ru.romanov.stankin.authorization_service.repository.postgre.PostgresSemesterScheduleRepository
import java.util.*

@Service
class ScheduleService(
    private val postgresSemesterScheduleRepository: PostgresSemesterScheduleRepository,
    private val postgresDailyScheduleRepository: PostgresDailyScheduleRepository
) {
    fun getScheduleByDateInterval(scheduleDateIntervalRequest: ScheduleDateIntervalRequest): List<DailySchedule> {
        val semesterScheduleProjectionList = postgresSemesterScheduleRepository.findByStgroupAndDate(
            scheduleDateIntervalRequest.stgroup,
            scheduleDateIntervalRequest.date
        )

        val dailySchedule = postgresDailyScheduleRepository.findBySemesterScheduleIdAndDate(
            semesterScheduleProjectionList.map { it.getId() }.first(), scheduleDateIntervalRequest.date
        )
        return dailySchedule
    }

}