package ru.romanov.stankin.authorization_service.domain.dto.testTask

import java.util.UUID

class SaveTaskForClassRequest(
    private val id: UUID,
    private val questions: List<QuestionDTO>
)