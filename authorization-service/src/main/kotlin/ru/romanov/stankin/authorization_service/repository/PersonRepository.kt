package ru.romanov.stankin.authorization_service.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import ru.romanov.stankin.authorization_service.domain.entity.security.PersonEntity
import ru.romanov.stankin.authorization_service.domain.entity.security.UserEntity

@Repository
interface PersonRepository : JpaRepository<PersonEntity, Long> {
    fun findByUser(user: UserEntity): PersonEntity
}