package ru.romanov.stankin.authorization_service.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import ru.romanov.stankin.authorization_service.entity.User

@Repository
interface UserRepository : JpaRepository<User, Int>{

    fun findByUsername(username: String?): User? {
        TODO("Not yet implemented")
    }

}
