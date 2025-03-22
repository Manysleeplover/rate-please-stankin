package ru.romanov.stankin.authorization_service.domain

import ru.romanov.stankin.authorization_service.domain.dto.DailyScheduleDTO
import ru.romanov.stankin.authorization_service.domain.dto.SemesterScheduleDTO
import ru.romanov.stankin.authorization_service.domain.entity.mongo.DailySchedule
import ru.romanov.stankin.authorization_service.domain.entity.mongo.SemesterSchedule

fun SemesterSchedule.mapToSemesterScheduleDto(dailyScheduleDTO: List<DailyScheduleDTO>) =
    SemesterScheduleDTO(
        stgroup = this.stgroup,
        dailySchedule = dailyScheduleDTO,
        lastClassDate = lastClassDate,
        firstClassDate = firstClassDate,
        id = this.id
    )

fun List<DailyScheduleDTO>.mapToDailyScheduleEntity(): List<DailySchedule> =
    this.stream().map {
        DailySchedule(
            date = it.date,
            stgroup = it.stgroup,
            subject = it.subject,
            audience = it.audience,
            startTime = it.startTime,
            endTime = it.endTime,
            group = it.group,
            teacher = it.teacher,
            type = it.type,
        )
    }.toList()