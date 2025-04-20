package ru.romanov.stankin.authorization_service.util

import ru.romanov.stankin.authorization_service.domain.dto.DailyScheduleDTO
import ru.romanov.stankin.authorization_service.domain.dto.SemesterScheduleDTO
import ru.romanov.stankin.authorization_service.domain.entity.DailyScheduleEntity
import ru.romanov.stankin.authorization_service.domain.entity.SemesterScheduleEntity

fun SemesterScheduleEntity.mapToDto(dailyScheduleDTO: List<DailyScheduleDTO>) =
    SemesterScheduleDTO(
        stgroup = this.stgroup,
        dailySchedule = dailyScheduleDTO,
        lastClassDate = lastClassDate,
        firstClassDate = firstClassDate,
        id = this.id
    )

fun List<DailyScheduleDTO>.mapToEntity(): List<DailyScheduleEntity> =
    this.stream().map {
        DailyScheduleEntity(
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

fun List<DailyScheduleEntity>.mapToDTO(): List<DailyScheduleDTO> =
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
            testId = it.taskForClass?.id.toString()
        )
    }.toList()

val labTimesMap: Map<String, String> =
    mapOf(
       "8:30" to "12:00",
        "10:20" to "14:00",
        "12:20" to "15:50",
        "14:10" to "17:40",
        "16:00" to "19:30",
        "18:00" to "21:10",
        "19:40" to "22:50"
    )