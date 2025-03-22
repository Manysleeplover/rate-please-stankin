package ru.romanov.stankin.authorization_service

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories

@SpringBootApplication
@EnableJpaRepositories(basePackages = ["ru.romanov.stankin.authorization_service.repository.postgre"])
@EnableMongoRepositories(basePackages = ["ru.romanov.stankin.authorization_service.repository.mongo"])
class AuthorizationServiceApplication

fun main(args: Array<String>) {
    runApplication<AuthorizationServiceApplication>(*args)
}
