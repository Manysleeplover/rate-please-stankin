package ru.romanov.stankin.authorization_service.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import ru.romanov.stankin.authorization_service.domain.entity.AssessmentEntity
import java.util.*

@Repository
interface AssessmentRepository : JpaRepository<AssessmentEntity, UUID> {
}