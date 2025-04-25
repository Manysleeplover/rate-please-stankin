package ru.romanov.stankin.authorization_service.service

import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.dto.assessment.AssessmentDTO
import ru.romanov.stankin.authorization_service.domain.dto.assessment.AssessmentQuestionDTO
import ru.romanov.stankin.authorization_service.domain.entity.Assessment
import ru.romanov.stankin.authorization_service.domain.entity.AssessmentEntity
import ru.romanov.stankin.authorization_service.domain.entity.AssessmentQuestion
import ru.romanov.stankin.authorization_service.repository.AssessmentRepository
import ru.romanov.stankin.authorization_service.repository.DailyScheduleRepository
import ru.romanov.stankin.authorization_service.repository.PassedAssessmentRepository
import java.util.*


@Service
class AssessmentService(
    private val dailyScheduleRepository: DailyScheduleRepository,
    private val assessmentRepository: AssessmentRepository,
    private val passedAssessmentRepository: PassedAssessmentRepository
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





