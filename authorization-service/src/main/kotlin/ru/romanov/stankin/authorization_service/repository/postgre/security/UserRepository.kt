package ru.romanov.stankin.authorization_service.repository.postgre.security

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import ru.romanov.stankin.authorization_service.domain.entity.security.UserEntity

@Repository
interface UserRepository : JpaRepository<UserEntity, Int>{

    fun findByUsername(username: String?): UserEntity?
    fun existsByUsername(username: String?): Boolean
    fun existsByEmail(email: String?): Boolean

}
