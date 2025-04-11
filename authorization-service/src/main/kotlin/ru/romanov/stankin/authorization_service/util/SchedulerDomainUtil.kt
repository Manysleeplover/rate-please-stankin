package ru.romanov.stankin.authorization_service.util

import ru.romanov.stankin.authorization_service.domain.dto.DailyScheduleDTO
import ru.romanov.stankin.authorization_service.domain.dto.SemesterScheduleDTO
import ru.romanov.stankin.authorization_service.domain.entity.postgres.DailySchedule
import ru.romanov.stankin.authorization_service.domain.entity.postgres.SemesterSchedule

fun SemesterSchedule.mapToDto(dailyScheduleDTO: List<DailyScheduleDTO>) =
    SemesterScheduleDTO(
        stgroup = this.stgroup,
        dailySchedule = dailyScheduleDTO,
        lastClassDate = lastClassDate,
        firstClassDate = firstClassDate,
        id = this.id
    )

fun List<DailyScheduleDTO>.mapToEntity(): List<DailySchedule> =
    this.stream().map {
        DailySchedule(
            date = it.date,
            stgroup = it.stgroup,
            subject = it.subject,
            audience = it.audience,
            startTime = it.startTime,
            endTime = it.endTime,
            subgroup = it.subgroup,
            teacher = it.teacher,
            type = it.type,
        )
    }.toList()

fun List<DailySchedule>.mapToDTO(): List<DailyScheduleDTO> =
    this.stream().map {
        DailyScheduleDTO(
            id = it.id,
            date = it.date,
            stgroup = it.stgroup,
            subject = it.subject,
            audience = it.audience,
            startTime = it.startTime,
            endTime = it.endTime,
            subgroup = it.subgroup,
            teacher = it.teacher,
            type = it.type,
        )
    }.toList()