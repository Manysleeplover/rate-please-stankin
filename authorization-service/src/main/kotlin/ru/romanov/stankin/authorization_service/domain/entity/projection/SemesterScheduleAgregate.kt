package ru.romanov.stankin.authorization_service.domain.entity.projection

import java.util.*

interface SemesterScheduleIdAndVersionDateProjection{
    fun getId(): UUID
    fun getVersionDate(): String
}