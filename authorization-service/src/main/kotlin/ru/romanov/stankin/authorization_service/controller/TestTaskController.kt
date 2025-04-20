package ru.romanov.stankin.authorization_service.controller

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import ru.romanov.stankin.authorization_service.domain.dto.testTask.SaveTaskForClassRequest
import ru.romanov.stankin.authorization_service.service.TaskForClassService


@RestController
@RequestMapping("/task")
class TestTaskController(
    private val taskForClassService: TaskForClassService
) {

    @PostMapping
    fun saveTestTask(@RequestBody request: SaveTaskForClassRequest) =
        taskForClassService.saveTaskForClass(request)

    @GetMapping("/{taskid}")
    fun getTaskForClassById(@PathVariable("taskid") taskId: String) =
        taskForClassService.getTaskForClassById(taskId)

    @DeleteMapping("/{taskid}")
    @ResponseStatus(HttpStatus.OK)
    fun deleteTaskForClassById(@PathVariable("taskid") taskId: String) =
        taskForClassService.deleteTaskForClassById(taskId)

}