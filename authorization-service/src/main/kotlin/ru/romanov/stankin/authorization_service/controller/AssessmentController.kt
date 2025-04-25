package ru.romanov.stankin.authorization_service.controller

import org.springframework.web.bind.annotation.*
import ru.romanov.stankin.authorization_service.domain.dto.AssessmentResultsDTO
import ru.romanov.stankin.authorization_service.domain.dto.assessment.AssessmentDTO
import ru.romanov.stankin.authorization_service.service.AssessmentService
import java.util.*

@RestController
@RequestMapping("/assessment")
class AssessmentController(
    private val assessmentService: AssessmentService
) {

    @PostMapping("/all")
    fun saveAssessmentForAllClassesBySemesterId() {

    }

    @PostMapping("/{dailyScheduleId}")
    fun saveAssessmentForAllClassesByDailyScheduleId(
        @PathVariable("dailyScheduleId") dailyScheduleId: UUID,
        @RequestBody assessment: AssessmentDTO
    ) {
        assessmentService.saveAssessmentByDailyScheduleId(dailyScheduleId, assessment)
    }

    @GetMapping("/{assessmentId}")
    fun getAssessmentById(@PathVariable("assessmentId") assessmentId: UUID): AssessmentDTO {
        return assessmentService.getAssessmentById(assessmentId).also { println(it) }
    }

    @PostMapping("/{assessmentId}/ratings")
    fun saveAssessmentRatings(
        @PathVariable("assessmentId") assessmentId: UUID,
        @RequestBody ratingsList: AssessmentResultsDTO
    ) {
        assessmentService.savePassedAssessmentResults(assessmentId, ratingsList)
    }
}