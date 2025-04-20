package ru.romanov.stankin.authorization_service.service

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.dto.PassedTestResult
import ru.romanov.stankin.authorization_service.domain.dto.testTask.AnswerOptionsDTO
import ru.romanov.stankin.authorization_service.domain.dto.testTask.QuestionDTO
import ru.romanov.stankin.authorization_service.domain.dto.testTask.SaveTaskForClassRequest
import ru.romanov.stankin.authorization_service.domain.dto.testTask.TaskForClassDTO
import ru.romanov.stankin.authorization_service.domain.entity.AnswerOptions
import ru.romanov.stankin.authorization_service.domain.entity.PassedTestEntity
import ru.romanov.stankin.authorization_service.domain.entity.Question
import ru.romanov.stankin.authorization_service.domain.entity.TaskForClassEntity
import ru.romanov.stankin.authorization_service.repository.DailyScheduleRepository
import ru.romanov.stankin.authorization_service.repository.PassedTestRepository
import ru.romanov.stankin.authorization_service.repository.PersonRepository
import ru.romanov.stankin.authorization_service.repository.TaskForClassRepository
import ru.romanov.stankin.authorization_service.repository.security.UserRepository
import java.util.*


@Service
class TaskForClassService(
    private val taskForClassRepository: TaskForClassRepository,
    private val dailyScheduleRepository: DailyScheduleRepository,
    private val userRepository: UserRepository,
    private val passedTestRepository: PassedTestRepository
    ) {

    fun getTaskForClassById(taskId: String) =
        taskForClassRepository.findById(UUID.fromString(taskId))
            .orElseThrow()
            .mapToDTO()

    fun saveTaskForClass(request: SaveTaskForClassRequest) {
        val targetDailySchedule = dailyScheduleRepository
            .findById(
                request
                    .id
            )
            .orElseThrow()
        val savedTaskForClassItem = TaskForClassEntity(
            dailySchedule = targetDailySchedule,
            taskList = request
                .questions
                .mapQuestionList()
        ).save()
        targetDailySchedule.taskForClass = savedTaskForClassItem
        dailyScheduleRepository.save(targetDailySchedule)
    }


    fun deleteTaskForClassById(taskId: String) =
        taskForClassRepository.deleteById(UUID.fromString(taskId))



    fun savePassedTestResult(passedTestResult: PassedTestResult) {
        val person = userRepository
            .findById(passedTestResult.userId.toInt())
            .orElseThrow()
            .person
        val tasks = taskForClassRepository
            .findById(UUID.fromString(passedTestResult.testTaskId))
            .orElseThrow()

        passedTestRepository.save(
            PassedTestEntity(
                taskForClass = tasks,
                person = person!!,
                completionPercent = passedTestResult.percentage.toInt()
            )
        )


    }

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

    private fun TaskForClassEntity.mapToDTO() =
        TaskForClassDTO(
            id = this.id.toString(),
            taskList = this.taskList.mapToQuestionDTO(),
            dailySchedule = this.dailySchedule
        )

    private fun List<Question>.mapToQuestionDTO() =
        this
            .stream()
            .map {
                QuestionDTO(
                    id = it.id,
                    title = it.title,
                    answers = it.answers.mapToAnswersOptionDTO()
                )
            }
            .toList()


    private fun List<AnswerOptions>.mapToAnswersOptionDTO() =
        this
            .stream()
            .map {
                AnswerOptionsDTO(
                    id = it.id,
                    text = it.text,
                    isCorrect = it.isCorrect
                )
            }
        .toList()
}





