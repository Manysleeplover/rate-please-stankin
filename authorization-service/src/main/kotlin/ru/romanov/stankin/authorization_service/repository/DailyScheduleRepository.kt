package ru.romanov.stankin.authorization_service.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import ru.romanov.stankin.authorization_service.domain.entity.DailyScheduleEntity
import java.time.LocalDate
import java.util.*

@Repository
interface DailyScheduleRepository : JpaRepository<DailyScheduleEntity, UUID> {

    fun findBySemesterScheduleIdAndDate(id: UUID, date: LocalDate): List<DailyScheduleEntity>

}