package ru.romanov.stankin.authorization_service.domain.dto.exceptions

import java.time.LocalDateTime

data class CommonExceptionDTO(
    val message: String,
    val status: Int,
    val trace: String,
    val timestamp: LocalDateTime,
)