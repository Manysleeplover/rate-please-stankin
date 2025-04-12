package ru.romanov.stankin.authorization_service.controller

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.romanov.stankin.authorization_service.domain.dto.testTask.SaveTaskForClassRequest
import ru.romanov.stankin.authorization_service.service.TestTaskService


@RestController
@RequestMapping("/task")
class TestTaskController(
    private val testTaskService: TestTaskService
) {

    @PostMapping("/save")
    fun saveTestTask(@RequestBody request: SaveTaskForClassRequest) =
        testTaskService.saveTaskForClass(request)

}