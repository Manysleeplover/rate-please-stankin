package ru.romanov.stankin.authorization_service.repository.postgre

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import ru.romanov.stankin.authorization_service.domain.entity.postgres.DailySchedule

@Repository
interface PostgreDailyScheduleRepository : JpaRepository<DailySchedule, String> {


}