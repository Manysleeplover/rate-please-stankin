package ru.romanov.stankin.authorization_service.domain.entity.mongo

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.CompoundIndex
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate

@Document(collection = "semester_schedule")
@CompoundIndex(name = "semester_schedule_idx", def = "{'firstClassDate':1, 'lastClassDate':-1, 'stgroup':1, 'versionDate':1}", unique = true)
class SemesterSchedule (
    @Id
    val id: String? = null,
    val firstClassDate: LocalDate,
    val lastClassDate: LocalDate,
    val stgroup: String,
    @DBRef
    val dailySchedule: List<DailySchedule>? = emptyList(),
    val versionDate: String? = null
)


