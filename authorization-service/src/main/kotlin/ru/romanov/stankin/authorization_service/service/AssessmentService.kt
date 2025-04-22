package ru.romanov.stankin.authorization_service.service

import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.repository.AssessmentRepository
import ru.romanov.stankin.authorization_service.repository.PassedAssessmentRepository

@Service
class AssessmentService (
    private val assessmentRepository: AssessmentRepository,
    private val passedAssessmentRepository: PassedAssessmentRepository
) {

}