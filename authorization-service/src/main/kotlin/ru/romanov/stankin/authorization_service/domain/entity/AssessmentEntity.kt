package ru.romanov.stankin.authorization_service.domain.entity

import com.fasterxml.jackson.annotation.JsonManagedReference
import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes
import java.util.*

@Entity(name = "assessment")
class AssessmentEntity (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,
    @OneToOne
    @JsonManagedReference
    @JoinColumn(name = "daily_schedule_id")
    val dailySchedule: DailyScheduleEntity,

    @JdbcTypeCode(SqlTypes.JSON)
    val assessmentList: Assessment
)

data class Assessment (
    val id: UUID? = null,
    val questions: List<AssessmentQuestion>
)

data class AssessmentQuestion (
    val id: UUID? = null,
    val question: String
)

