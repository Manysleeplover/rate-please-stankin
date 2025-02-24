package ru.romanov.stankin.authorization_service.domain.dto

import java.time.LocalDate

data class DailySchedule(
    val date: LocalDate,
    val stgroup: String?,
    val subject: String?,
    val audience: String,
    val startTime: String?,
    val endTime: String?,
    val group: String?,
    val teacher: String?,
    val type: String?
)