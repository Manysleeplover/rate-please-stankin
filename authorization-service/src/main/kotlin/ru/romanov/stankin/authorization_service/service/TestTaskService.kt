package ru.romanov.stankin.authorization_service.service

import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.repository.postgre.TaskForClassRepository


@Service
class TestTaskService(
    private val taskForClassRepository: TaskForClassRepository
) {
    fun saveTaskForClass(): Unit {
    }

}
