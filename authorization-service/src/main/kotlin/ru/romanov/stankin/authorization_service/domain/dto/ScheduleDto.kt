package ru.romanov.stankin.authorization_service.domain.dto

import io.swagger.v3.oas.annotations.media.Schema

/**
 * Расписание для конкретного предмета
 */
@Schema(name = "ScheduleDTO",
    example =
        "{\n" +
        "    stgroup: 'МДМ-21-11',\n" +
        "    subject: 'Интегрированные CAE системы в машиностроении',\n" +
        "    audience: '',\n" +
        "    periods: [ [Object] ],\n" +
        "    dates: [ '13.11', '20.11' ],\n" +
        "    start_time: '10:20',\n" +
        "    end_time: '12:00',\n" +
        "    group: 'Без подгруппы',\n" +
        "    teacher: 'Гиловой Л.Я.',\n" +
        "    type: 'лекции'\n" +
        "},"
        )
data class ScheduleDto(
    val stgroup: String,
    val subject: String,
    val audience: String,
    val period: Any,
    val dates: List<String>,
    val startTime: String,
    val endTime: String,
    val group: String,
    val teacher: String,
    val type: String,
)
