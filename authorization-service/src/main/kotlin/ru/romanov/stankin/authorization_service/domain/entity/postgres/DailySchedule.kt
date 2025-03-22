package ru.romanov.stankin.authorization_service.domain.entity.postgres

import jakarta.persistence.*
import java.time.LocalDate
import java.util.*

@Entity(name = "daily_schedule")
data class DailySchedule(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,
    val date: LocalDate,
    val stgroup: String?,
    val subject: String?,
    val audience: String,
    val startTime: String?,
    val endTime: String?,
    val subgroup: String?,
    val teacher: String?,
    val type: String?,
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "semester_schedule_id")
    var semesterSchedule: SemesterSchedule? = null
)