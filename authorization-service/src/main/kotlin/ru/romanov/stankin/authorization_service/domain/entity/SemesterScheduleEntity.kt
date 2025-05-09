package ru.romanov.stankin.authorization_service.domain.entity

import com.fasterxml.jackson.annotation.JsonManagedReference
import jakarta.persistence.*
import java.time.LocalDate
import java.util.*


@Entity(name = "semester_schedule")
class SemesterScheduleEntity (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,
    val firstClassDate: LocalDate,
    val lastClassDate: LocalDate,
    val stgroup: String,
    val versionDate: String? = null,
    @JsonManagedReference
    @OneToMany(mappedBy = "semesterSchedule", orphanRemoval = true, fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
    var dailyScheduleEntity: List<DailyScheduleEntity>? = emptyList(),
)


