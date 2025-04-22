package ru.romanov.stankin.authorization_service.domain.dto.schedule

import java.time.LocalDate
import java.util.*

data class DailyScheduleDTO(
    val id: UUID? = null,
    val date: LocalDate,
    val stgroup: String,
    val subject: String,
    val audience: String?,
    val startTime: String,
    val endTime: String,
    val subgroup: String?,
    val teacher: String,
    val type: String,
    val testId: String? = null,
    val assessmentId: String? = null,
)