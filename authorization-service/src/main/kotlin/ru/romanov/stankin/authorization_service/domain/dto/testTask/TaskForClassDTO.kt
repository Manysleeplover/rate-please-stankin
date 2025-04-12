package ru.romanov.stankin.authorization_service.domain.dto.testTask


import ru.romanov.stankin.authorization_service.domain.entity.postgres.DailySchedule
import java.util.*

data class TaskForClassDTO(
    val id: String,
    val dailySchedule: DailySchedule,
    val taskList: List<QuestionDTO>
);

data class QuestionDTO(
    val id: String,
    val title: String,
    val answers: List<AnswerOptionsDTO>
)

data class AnswerOptionsDTO(
    val id: String,
    val text: String,
    val isCorrect: Boolean
)
