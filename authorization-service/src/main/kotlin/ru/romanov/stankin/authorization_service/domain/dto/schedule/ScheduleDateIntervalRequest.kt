package ru.romanov.stankin.authorization_service.domain.dto.schedule

import java.time.LocalDate

data class ScheduleDateIntervalRequest(
    val date: LocalDate,
    val stgroup: String
)
