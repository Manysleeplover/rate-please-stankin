package ru.romanov.stankin.authorization_service.domain.dto.mj

data class MJStudentDataRequestDTO(
    val code: String,
    val clientId: String,
    val clientSecret: String,
)