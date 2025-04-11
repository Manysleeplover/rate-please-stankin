package ru.romanov.stankin.authorization_service.domain.dto

import java.time.LocalDate
import java.util.*

data class SemesterScheduleDTO(
    val id: UUID? = null,
    val firstClassDate: LocalDate,
    val lastClassDate: LocalDate,
    val stgroup: String,
    val dailySchedule: List<DailyScheduleDTO>?,
    val versionDate: String? = null

)