package ru.romanov.stankin.authorization_service.repository.authorization

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import ru.romanov.stankin.authorization_service.domain.authorization.entity.UserEntity

@Repository
interface UserRepository : JpaRepository<UserEntity, Int>{

    fun findByUsername(username: String?): UserEntity?
    fun existsByUsername(username: String?): Boolean
    fun existsByEmail(email: String?): Boolean

}
