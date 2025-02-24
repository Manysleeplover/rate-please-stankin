package ru.romanov.stankin.authorization_service.controller

import jakarta.annotation.security.PermitAll
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.romanov.stankin.authorization_service.domain.dto.ScheduleDto
import ru.romanov.stankin.authorization_service.service.ScheduleService

@RestController
@RequestMapping("/schedule")
class ScheduleController(
    private val scheduleService: ScheduleService
){

    @PostMapping()
    fun processSchedule(@RequestBody listOfSubjects: List<ScheduleDto>): List<ScheduleDto>{
        println(listOfSubjects)

        return listOfSubjects
    }
}