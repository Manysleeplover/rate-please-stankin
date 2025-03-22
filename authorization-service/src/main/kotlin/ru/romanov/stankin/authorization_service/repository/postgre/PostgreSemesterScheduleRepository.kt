package ru.romanov.stankin.authorization_service.repository.postgre

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import ru.romanov.stankin.authorization_service.domain.entity.postgres.SemesterSchedule
import java.time.LocalDate

@Repository
interface PostgreSemesterScheduleRepository : JpaRepository<SemesterSchedule, String> {

    fun findByFirstClassDateAndLastClassDateAndStgroupAndVersionDate(
        firstClassDate: LocalDate,
        lastClassDate: LocalDate,
        stgroup: String,
        versionDate: String?
    ) : List<SemesterSchedule>
}
