package ru.romanov.stankin.authorization_service.repository.postgre

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import ru.romanov.stankin.authorization_service.domain.entity.TaskForClassEntity
import java.util.UUID

@Repository
interface TaskForClassRepository : JpaRepository<TaskForClassEntity, UUID>{

}
