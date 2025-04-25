package ru.romanov.stankin.authorization_service.service

import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.dto.AssessmentResultsDTO
import ru.romanov.stankin.authorization_service.domain.dto.assessment.AssessmentDTO
import ru.romanov.stankin.authorization_service.domain.dto.assessment.AssessmentQuestionDTO
import ru.romanov.stankin.authorization_service.domain.entity.*
import ru.romanov.stankin.authorization_service.repository.AssessmentRepository
import ru.romanov.stankin.authorization_service.repository.DailyScheduleRepository
import ru.romanov.stankin.authorization_service.repository.PassedAssessmentRepository
import ru.romanov.stankin.authorization_service.repository.security.UserRepository
import java.util.*


@Service
class AssessmentService(
    private val dailyScheduleRepository: DailyScheduleRepository,
    private val assessmentRepository: AssessmentRepository,
    private val passedAssessmentRepository: PassedAssessmentRepository,
    private val userRepository: UserRepository
) {
    fun saveAssessmentByDailyScheduleId(dailyScheduleId: UUID, assessment: AssessmentDTO) {
        val dailySchedule = dailyScheduleRepository.findById(dailyScheduleId).orElseThrow()
        val assessmentEntity = AssessmentEntity(
            dailySchedule = dailySchedule,
            assessmentList = assessment.mapAssessmentToEntity()
        )
        assessmentRepository.save(assessmentEntity)
        dailySchedule.assessment = assessmentEntity
        dailyScheduleRepository.save(dailySchedule)
    }


    fun getAssessmentById(assessmentId: UUID): AssessmentDTO =
        assessmentRepository
            .findById(assessmentId)
            .orElseThrow()
            .mapAssessmentToDTO()

    fun deleteAssessmentById(assessmentId: UUID) =
        assessmentRepository.deleteById(assessmentId)

    fun savePassedAssessmentResults(assessmentId: UUID, assessmentsResult: AssessmentResultsDTO) {
        val person = userRepository
            .findById(assessmentsResult.userId.toInt())
            .orElseThrow()
            .person!!
        val assessment = assessmentRepository
            .findById(assessmentId)
            .orElseThrow()
        passedAssessmentRepository
            .save(
                PassedAssessmentEntity(
                    person = person,
                    assessment = assessment,
                    estimates = AssessmentEstimates(
                        answers = assessmentsResult.results.map {
                            AssessmentAnswers(
                                rate = it.rate,
                                question = it.question,
                            )
                        },
                    ),
                )
            )
        println(assessmentsResult)
        println(assessmentId)
    }

    private fun AssessmentEntity.mapAssessmentToDTO(): AssessmentDTO =
        AssessmentDTO(
            id = this.id,
            questions = this.assessmentList.questions.mapAssessmentListToDTO()
        )

    private fun List<AssessmentQuestion>.mapAssessmentListToDTO(): List<AssessmentQuestionDTO> =
        this.stream().map {
            AssessmentQuestionDTO(
                id = it.id,
                question = it.question
            )
        }.toList()

    private fun AssessmentDTO.mapAssessmentToEntity(): Assessment =
        Assessment(
            id = this.id,
            questions = this.questions.mapAssessmentListToEntity()
        )

    private fun List<AssessmentQuestionDTO>.mapAssessmentListToEntity(): List<AssessmentQuestion> =
        this.stream().map {
            AssessmentQuestion(
                id = it.id,
                question = it.question
            )
        }.toList()


}





