package ru.romanov.stankin.authorization_service.domain.entity.mongo

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.IndexDirection
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate

@Document(collection = "daily_schedule")
data class DailySchedule(
    @Id
    val id: String? = null,
    @Indexed(direction = IndexDirection.ASCENDING)
    val date: LocalDate,
    val stgroup: String?,
    val subject: String?,
    val audience: String,
    val startTime: String?,
    val endTime: String?,
    val subgroup: String?,
    val teacher: String?,
    val type: String?,
)