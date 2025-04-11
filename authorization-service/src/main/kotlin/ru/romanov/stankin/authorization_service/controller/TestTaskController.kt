package ru.romanov.stankin.authorization_service.controller

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import ru.romanov.stankin.authorization_service.domain.dto.testTask.SaveTaskForClassRequest
import ru.romanov.stankin.authorization_service.service.TestTaskService


@RestController("/task")
class TestTaskController(
    private final val testTaskService: TestTaskService
) {

    @PostMapping
    fun saveTestTask(@RequestBody request: SaveTaskForClassRequest) =
        testTaskService.saveTaskForClass()

}