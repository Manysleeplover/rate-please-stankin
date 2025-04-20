package ru.romanov.stankin.authorization_service.domain.dto


data class PassedTestResult(
    val percentage: Double,
    val testTaskId: String,
    val userId: Long
)
