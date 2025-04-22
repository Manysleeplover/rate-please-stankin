package ru.romanov.stankin.authorization_service.controller

import org.springframework.web.bind.annotation.*
import ru.romanov.stankin.authorization_service.domain.entity.AssessmentEntity
import ru.romanov.stankin.authorization_service.domain.entity.AssessmentQuestions
import java.util.UUID

@RestController
@RequestMapping("/assessments")
class AssessmentController() {

    @PostMapping("/all")
    fun saveAssessmentForAllClassesBySemesterId(){

    }

    @PostMapping("/{dailyScheduleId}")
    fun saveAssessmentForAllClassesByDailyScheduleId(
        @PathVariable("dailyScheduleId") dailyScheduleId: UUID,
        @RequestBody assessmentQuestions: AssessmentQuestions
    ){

    }
}