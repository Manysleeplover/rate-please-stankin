package ru.romanov.stankin.authorization_service.controller

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import ru.romanov.stankin.authorization_service.domain.dto.taskForClass.PassedTestResult
import ru.romanov.stankin.authorization_service.domain.dto.taskForClass.SaveTaskForClassRequest
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

    @PostMapping("/passed")
    @ResponseStatus(HttpStatus.OK)
    fun savePassedTestResult(@RequestBody passedTestResult: PassedTestResult){
        taskForClassService.savePassedTestResult(passedTestResult)
    }

}