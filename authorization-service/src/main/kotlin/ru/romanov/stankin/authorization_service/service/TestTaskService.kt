package ru.romanov.stankin.authorization_service.service

import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.dto.testTask.AnswerOptionsDTO
import ru.romanov.stankin.authorization_service.domain.dto.testTask.QuestionDTO
import ru.romanov.stankin.authorization_service.domain.dto.testTask.SaveTaskForClassRequest
import ru.romanov.stankin.authorization_service.domain.entity.AnswerOptions
import ru.romanov.stankin.authorization_service.domain.entity.Question
import ru.romanov.stankin.authorization_service.domain.entity.TaskForClassEntity
import ru.romanov.stankin.authorization_service.repository.postgre.DailyScheduleRepository
import ru.romanov.stankin.authorization_service.repository.postgre.TaskForClassRepository


@Service
class TestTaskService(
    private val taskForClassRepository: TaskForClassRepository,
    private val dailyScheduleRepository: DailyScheduleRepository,
) {


    fun saveTaskForClass(request: SaveTaskForClassRequest) =
        TaskForClassEntity(
            dailySchedule = dailyScheduleRepository
                .findById(
                    request
                        .id
                )
                .orElseThrow(),
            taskList = request
                .questions
                .mapQuestionList()
        )
        .save()

    private fun List<QuestionDTO>.mapQuestionList(): List<Question> =
        this
            .stream()
            .map {
                Question(
                    id = it.id,
                    title = it.title,
                    answers = it.answers.mapToAnswerOptionsList()
                )
            }
            .toList()

    private fun List<AnswerOptionsDTO>.mapToAnswerOptionsList(): List<AnswerOptions> =
        this
            .stream()
            .map {
                AnswerOptions(
                    id = it.id,
                    text = it.text,
                    isCorrect = it.isCorrect
                )
            }
            .toList()

    private fun TaskForClassEntity.save(): TaskForClassEntity =
        taskForClassRepository.save(this)

}



