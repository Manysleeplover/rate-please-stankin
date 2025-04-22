package ru.romanov.stankin.authorization_service.domain.dto.taskForClass


import ru.romanov.stankin.authorization_service.domain.entity.DailyScheduleEntity

data class TaskForClassDTO(
    val id: String,
    val dailySchedule: DailyScheduleEntity,
    val taskList: List<QuestionDTO>
);

data class QuestionDTO(
    val id: String,
    val title: String,
    val answers: List<AnswerOptionsDTO>
)

data class AnswerOptionsDTO(
    val id: String?,
    val text: String,
    val isCorrect: Boolean
)
