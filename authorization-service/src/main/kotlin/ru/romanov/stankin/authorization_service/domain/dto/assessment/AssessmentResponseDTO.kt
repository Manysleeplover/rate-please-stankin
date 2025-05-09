package ru.romanov.stankin.authorization_service.domain.dto.assessment

import ru.romanov.stankin.authorization_service.domain.dto.schedule.DailyScheduleDTO
import java.util.*

class AssessmentResponseDTO (
    val id: UUID? = null,
    val dailySchedule: DailyScheduleDTO? = null,
    val assessmentList: AssessmentDTO
)

data class AssessmentDTO (
    val id: UUID? = null,
    val questions: List<AssessmentQuestionDTO>
)

data class AssessmentQuestionDTO (
    val id: UUID? = null,
    val question: String
)
