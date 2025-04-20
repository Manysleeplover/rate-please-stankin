package ru.romanov.stankin.authorization_service.service

import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.dto.DailyScheduleDTO
import ru.romanov.stankin.authorization_service.domain.dto.SemesterScheduleDTO
import ru.romanov.stankin.authorization_service.domain.entity.SemesterScheduleEntity
import ru.romanov.stankin.authorization_service.repository.DailyScheduleRepository
import ru.romanov.stankin.authorization_service.repository.SemesterScheduleRepository
import ru.romanov.stankin.authorization_service.repository.TaskForClassRepository
import ru.romanov.stankin.authorization_service.util.mapToDTO
import java.time.LocalDate

@Service
class ScheduleService(
    private val semesterScheduleRepository: SemesterScheduleRepository,
    private val dailyScheduleRepository: DailyScheduleRepository,
    private val taskForClassRepository: TaskForClassRepository,
) {
    fun getScheduleByDateInterval(date: LocalDate,
                                  stgroup: String
    ): List<DailyScheduleDTO> {
        val semesterScheduleProjectionList = semesterScheduleRepository.findByStgroupAndDate(
            stgroup,
            date
        )

        if(semesterScheduleProjectionList.isEmpty()) return emptyList()

        val dailySchedule = dailyScheduleRepository.findBySemesterScheduleIdAndDate(
            semesterScheduleProjectionList.map { it.getId() }.first(), date
        )


        return dailySchedule.mapToDTO()
    }

    fun getAllSemesterSchedules() =
        semesterScheduleRepository.findAll().mapToDTO()


    private fun List<SemesterScheduleEntity>.mapToDTO(): List<SemesterScheduleDTO> =
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