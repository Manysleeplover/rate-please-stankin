package ru.romanov.stankin.authorization_service.controller

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.romanov.stankin.authorization_service.domain.dto.DailySchedule
import ru.romanov.stankin.authorization_service.domain.dto.ScheduleDto
import ru.romanov.stankin.authorization_service.service.ScheduleService

@RestController
@RequestMapping("/schedule")
class ScheduleController(
    private val scheduleService: ScheduleService
){

    @PostMapping
    fun processSchedule(@RequestBody listOfSubjects: List<ScheduleDto>): List<DailySchedule>{
        val processSchedule = scheduleService.processSchedule(listOfSubjects)
        println(processSchedule)
        return processSchedule
    }
}