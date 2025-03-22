package ru.romanov.stankin.authorization_service.service

import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.dto.ScheduleDateIntervalRequest
import ru.romanov.stankin.authorization_service.repository.mongo.DailyScheduleRepository
import ru.romanov.stankin.authorization_service.repository.mongo.SemesterScheduleRepository

@Service
class ScheduleService(
    private val semesterScheduleRepository: SemesterScheduleRepository,
    private val dailyScheduleRepository: DailyScheduleRepository
) {
    fun getScheduleByDateInterval(scheduleDateIntervalRequest: ScheduleDateIntervalRequest) {
    }


}