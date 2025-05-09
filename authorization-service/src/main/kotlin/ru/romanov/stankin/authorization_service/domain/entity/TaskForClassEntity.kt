package ru.romanov.stankin.authorization_service.domain.entity

import com.fasterxml.jackson.annotation.JsonManagedReference
import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes
import java.util.*

@Entity(name = "task_for_class")
class TaskForClassEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,
    @OneToOne
    @JsonManagedReference
    @JoinColumn(name = "daily_schedule_id")
    val dailySchedule: DailyScheduleEntity,
    @JdbcTypeCode(SqlTypes.JSON)
    val taskList: List<Question>
);

data class Question(
    val id: String,
    val title: String,
    val answers: List<AnswerOptions>
)

data class AnswerOptions(
    val id: String?,
    val text: String,
    val isCorrect: Boolean
)
