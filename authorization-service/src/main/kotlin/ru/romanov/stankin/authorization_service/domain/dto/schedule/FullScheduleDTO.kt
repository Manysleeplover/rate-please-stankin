package ru.romanov.stankin.authorization_service.domain.dto.schedule

import io.swagger.v3.oas.annotations.media.Schema


/**
 * Обертка для списка расписаний всех предметов из pdf, которая парсится на сервере node.js
 */
@Schema(name = "FullScheduleDTO")
data class FullScheduleDTO(
    val listOfSubjects: List<ScheduleDto>
)