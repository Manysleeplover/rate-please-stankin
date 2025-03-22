package ru.romanov.stankin.authorization_service.domain.dto

import java.time.LocalDate

data class SemesterScheduleDTO(
    val id: String? = null,
    val firstClassDate: LocalDate,
    val lastClassDate: LocalDate,
    val stgroup: String,
    val dailySchedule: List<DailyScheduleDTO>,
    val versionDate: String? = null

)