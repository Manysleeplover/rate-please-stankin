package ru.romanov.stankin.authorization_service.domain.dto.testTask


import ru.romanov.stankin.authorization_service.domain.entity.postgres.DailySchedule
import java.util.*

data class TaskForClassDTO(
    val id: UUID? = null,
    val dailySchedule: DailySchedule,
    val taskList: List<QuestionDTO>
);

data class QuestionDTO(
    private val id: Int,
    private val title: String,
    private val answers: List<AnswerOptionsDTO>
)

data class AnswerOptionsDTO(
    private val id: Int,
    private val text: String,
    private val isCorrect: Boolean
)
