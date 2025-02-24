package ru.romanov.stankin.authorization_service.domain.dto

import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.v3.oas.annotations.media.Schema

@Schema(example = """
    {
            "start_date": "11.09",
            "end_date": "30.10",
            "repeat": "к.н."
    }
""")
class PeriodsDTO(
    @JsonProperty("start_date")
    val startDate: String,
    @JsonProperty("end_date")
    val endDate: String,
    val repeat: String?
)
