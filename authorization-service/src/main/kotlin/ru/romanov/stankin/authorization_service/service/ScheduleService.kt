package ru.romanov.stankin.authorization_service.service

import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.dto.ScheduleDateIntervalRequest
import ru.romanov.stankin.authorization_service.repository.postgre.PostgreDailyScheduleRepository
import ru.romanov.stankin.authorization_service.repository.postgre.PostgreSemesterScheduleRepository

@Service
class ScheduleService(
    private val postgreSemesterScheduleRepository: PostgreSemesterScheduleRepository,
    private val postgreDailyScheduleRepository: PostgreDailyScheduleRepository
) {
    fun getScheduleByDateInterval(scheduleDateIntervalRequest: ScheduleDateIntervalRequest) {


    }
}