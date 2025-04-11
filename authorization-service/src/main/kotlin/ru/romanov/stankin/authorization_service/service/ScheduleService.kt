package ru.romanov.stankin.authorization_service.service

import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.dto.DailyScheduleDTO
import ru.romanov.stankin.authorization_service.domain.dto.SemesterScheduleDTO
import ru.romanov.stankin.authorization_service.domain.entity.postgres.SemesterSchedule
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
                                  stgroup: String
    ): List<DailyScheduleDTO> {
        val semesterScheduleProjectionList = postgresSemesterScheduleRepository.findByStgroupAndDate(
            stgroup,
            date
        )

        if(semesterScheduleProjectionList.isEmpty()) return emptyList()

        val dailySchedule = postgresDailyScheduleRepository.findBySemesterScheduleIdAndDate(
            semesterScheduleProjectionList.map { it.getId() }.first(), date
        )
        return dailySchedule.mapToDTO()
    }

    fun getAllSemesterSchedules() =
        postgresSemesterScheduleRepository.findAll().mapToDTO()


    private fun List<SemesterSchedule>.mapToDTO(): List<SemesterScheduleDTO> =
        this.stream().map {
            SemesterScheduleDTO(
                id = it.id,
                versionDate = it.versionDate,
                firstClassDate = it.firstClassDate,
                lastClassDate = it.lastClassDate,
                stgroup = it.stgroup,
                dailySchedule = null
            )
        }.toList()
}