package ru.romanov.stankin.authorization_service.domain.dto

data class AssessmentResultsDTO(
    val userId: String,
    val results: List<PassedAssessmentRequestDTO>
)

data class PassedAssessmentRequestDTO(
    val id: String,
    val question: String,
    val rate: Int,
)

