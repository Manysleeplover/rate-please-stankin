package ru.romanov.stankin.authorization_service.controller

import org.springframework.web.bind.annotation.*
import ru.romanov.stankin.authorization_service.domain.dto.ScheduleDateIntervalRequest
import ru.romanov.stankin.authorization_service.domain.dto.ScheduleDto
import ru.romanov.stankin.authorization_service.domain.dto.SemesterScheduleDTO
import ru.romanov.stankin.authorization_service.service.ScheduleSaverService
import ru.romanov.stankin.authorization_service.service.ScheduleService
import java.time.LocalDate

@RestController
@RequestMapping("/schedule")
class ScheduleController(
    private val scheduleSaverService: ScheduleSaverService,
    private val scheduleService: ScheduleService,
){

    @PostMapping
    fun processSchedule(@RequestBody listOfSubjects: List<ScheduleDto>): SemesterScheduleDTO =
         scheduleSaverService.processSchedule(listOfSubjects)

    @GetMapping("/by-date-interval")
    fun getScheduleByDateInterval(
        @RequestParam("date") date: LocalDate,
        @RequestParam("stgroup") stgroup: String,
        ) =
        scheduleService.getScheduleByDateInterval(date, stgroup)

}