package ru.romanov.stankin.authorization_service.repository.postgre

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import ru.romanov.stankin.authorization_service.domain.entity.SemesterSchedule
import ru.romanov.stankin.authorization_service.domain.entity.projection.SemesterScheduleIdAndVersionDateProjection
import java.time.LocalDate

@Repository
interface SemesterScheduleRepository : JpaRepository<SemesterSchedule, String> {

    fun findByFirstClassDateAndLastClassDateAndStgroupAndVersionDate(
        firstClassDate: LocalDate,
        lastClassDate: LocalDate,
        stgroup: String,
        versionDate: String?
    ) : List<SemesterSchedule>

    @Query(nativeQuery = true, value = """SELECT s.id, s.version_date
                                            FROM public.semester_schedule s 
                                            where s.stgroup = :stgroup
                                            and :date between s.first_class_date and s.last_class_date""")
    fun findByStgroupAndDate(
        @Param("stgroup") stgroup: String,
        @Param("date") date: LocalDate) : List<SemesterScheduleIdAndVersionDateProjection>
}
