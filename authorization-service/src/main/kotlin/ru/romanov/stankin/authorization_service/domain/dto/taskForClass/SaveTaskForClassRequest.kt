package ru.romanov.stankin.authorization_service.domain.dto.taskForClass

import java.util.UUID

data class SaveTaskForClassRequest(
    val id: UUID,
    val questions: List<QuestionDTO>
)