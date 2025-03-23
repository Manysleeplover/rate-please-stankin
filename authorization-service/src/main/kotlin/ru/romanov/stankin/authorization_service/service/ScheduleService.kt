package ru.romanov.stankin.authorization_service.service

import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.RequestParam
import ru.romanov.stankin.authorization_service.domain.dto.DailyScheduleDTO
import ru.romanov.stankin.authorization_service.domain.dto.ScheduleDateIntervalRequest
import ru.romanov.stankin.authorization_service.domain.entity.postgres.DailySchedule
import ru.romanov.stankin.authorization_service.repository.postgre.PostgresDailyScheduleRepository
import ru.romanov.stankin.authorization_service.repository.postgre.PostgresSemesterScheduleRepository
import ru.romanov.stankin.authorization_service.util.mapToDTO
import java.time.LocalDate

@Service
class ScheduleService(
    private val postgresSemesterScheduleRepository: PostgresSemesterScheduleRepository,
    private val postgresDailyScheduleRepository: PostgresDailyScheduleRepository
) {
    fun getScheduleByDateInterval(date: LocalDate,
                                  stgroup: String,): List<DailyScheduleDTO> {
        val semesterScheduleProjectionList = postgresSemesterScheduleRepository.findByStgroupAndDate(
            stgroup,
            date
        )

        val dailySchedule = postgresDailyScheduleRepository.findBySemesterScheduleIdAndDate(
            semesterScheduleProjectionList.map { it.getId() }.first(), date
        )
        return dailySchedule.mapToDTO()
    }

}