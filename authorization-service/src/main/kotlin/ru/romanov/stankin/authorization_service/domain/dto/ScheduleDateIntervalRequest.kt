package ru.romanov.stankin.authorization_service.domain.dto

import java.time.LocalDate

data class ScheduleDateIntervalRequest(
    val startDate: LocalDate,
    val endDate: LocalDate,
)
