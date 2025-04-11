package ru.romanov.stankin.authorization_service.domain.entity.postgres

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
    @JoinColumn(name = "daily_schedule_id", referencedColumnName = "id")
    val dailySchedule: DailySchedule,
    @JdbcTypeCode(SqlTypes.JSON)
    val taskList: List<Question>
);

data class Question(
    private val id: Int,
    private val title: String,
    private val answers: List<AnswerOptions>
)

data class AnswerOptions(
    private val id: Int,
    private val text: String,
    private val isCorrect: Boolean
)
