package ru.romanov.stankin.authorization_service.controller

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.romanov.stankin.authorization_service.domain.dto.FullScheduleDTO
import ru.romanov.stankin.authorization_service.service.ScheduleService

@RestController
@RequestMapping("/schedule")
class ScheduleController(
    private val scheduleService: ScheduleService
){


    @PostMapping
    fun processSchedule(fullScheduleDTO: FullScheduleDTO){
        scheduleService.processSchedule(fullScheduleDTO)
    }
}