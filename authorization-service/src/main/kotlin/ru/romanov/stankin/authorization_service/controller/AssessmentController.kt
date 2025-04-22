package ru.romanov.stankin.authorization_service.controller

import org.springframework.web.bind.annotation.*
import ru.romanov.stankin.authorization_service.domain.entity.Assessment
import ru.romanov.stankin.authorization_service.service.AssessmentService
import java.util.*

@RestController
@RequestMapping("/assessment")
class AssessmentController(
    private val assessmentService: AssessmentService
) {

    @PostMapping("/all")
    fun saveAssessmentForAllClassesBySemesterId(){

    }

    @PostMapping("/{dailyScheduleId}")
    fun saveAssessmentForAllClassesByDailyScheduleId(
        @PathVariable("dailyScheduleId") dailyScheduleId: UUID,
        @RequestBody assessment: Assessment
    ){
        assessmentService.saveAssessmentByDailyScheduleId(dailyScheduleId, assessment)
    }
}