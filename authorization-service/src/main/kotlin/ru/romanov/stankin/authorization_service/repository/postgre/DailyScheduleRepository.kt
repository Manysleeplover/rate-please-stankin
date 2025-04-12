package ru.romanov.stankin.authorization_service.repository.postgre

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import ru.romanov.stankin.authorization_service.domain.entity.DailySchedule
import java.time.LocalDate
import java.util.*

@Repository
interface DailyScheduleRepository : JpaRepository<DailySchedule, UUID> {

    fun findBySemesterScheduleIdAndDate(id: UUID, date: LocalDate): List<DailySchedule>

}