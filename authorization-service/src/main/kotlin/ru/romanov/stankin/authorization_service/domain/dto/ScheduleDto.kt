package ru.romanov.stankin.authorization_service.domain.dto

import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.v3.oas.annotations.media.Schema

/**
 * Расписание для конкретного предмета
 */
@Schema(name = "ScheduleDTO",
    example = """
{
    "stgroup": "МДМ-21-11",
    "subject": "Интегрированные CAE системы в машиностроении",
    "audience": "",
    "periods": [
        {
            "start_date": "11.09",
            "end_date": "30.10",
            "repeat": "к.н."
        }
    ],
    "dates": [
        "13.11",
        "20.11"
    ],
    "start_time": "10:20",
    "end_time": "12:00",
    "group": "Без подгруппы",
    "teacher": "Гиловой Л.Я.",
    "type": "лекции"
}
    """)
data class ScheduleDto(
    val stgroup: String,
    val subject: String,
    val audience: String,
    val periods: List<PeriodsDTO>,
    val dates: List<String>,
    @JsonProperty("start_time")
    val start_time: String,
    @JsonProperty("end_time")
    val end_time: String,
    val group: String?,
    val teacher: String,
    val type: String,
)
