package ru.romanov.stankin.authorization_service.repository.mongo

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository
import ru.romanov.stankin.authorization_service.domain.entity.mongo.DailySchedule
import ru.romanov.stankin.authorization_service.domain.entity.mongo.SemesterSchedule
import java.time.LocalDate

@Repository
interface SemesterScheduleRepository : MongoRepository<SemesterSchedule, String> {

    fun findByFirstClassDateAndLastClassDateAndStgroupAndVersionDate(
        firstClassDate: LocalDate,
        lastClassDate: LocalDate,
        stgroup: String,
        versionDate: String?
    ) : List<SemesterSchedule>

    @Query("{ 'dailySchedule': { \$elemMatch: { 'date': ?0 } } }")
    fun findByDailyScheduleDate(date: LocalDate): List<SemesterSchedule>

}
