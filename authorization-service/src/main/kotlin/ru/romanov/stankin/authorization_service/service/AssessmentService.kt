package ru.romanov.stankin.authorization_service.service

import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.entity.Assessment
import ru.romanov.stankin.authorization_service.domain.entity.AssessmentEntity
import ru.romanov.stankin.authorization_service.repository.AssessmentRepository
import ru.romanov.stankin.authorization_service.repository.DailyScheduleRepository
import ru.romanov.stankin.authorization_service.repository.PassedAssessmentRepository
import java.util.*


@Service
class AssessmentService (
    private val dailyScheduleRepository: DailyScheduleRepository,
    private val assessmentRepository: AssessmentRepository,
    private val passedAssessmentRepository: PassedAssessmentRepository
) {

    fun saveAssessmentByDailyScheduleId(dailyScheduleId: UUID, assessment: Assessment) {
        val dailySchedule = dailyScheduleRepository.findById(dailyScheduleId).orElseThrow()
        val assessmentEntity = AssessmentEntity(
            dailySchedule = dailySchedule,
            assessmentList = assessment
        )
        assessmentRepository.save(assessmentEntity)
        dailySchedule.assessment = assessmentEntity
        dailyScheduleRepository.save(dailySchedule)
    }


}