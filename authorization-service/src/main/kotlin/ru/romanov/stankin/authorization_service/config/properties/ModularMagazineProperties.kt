package ru.romanov.stankin.authorization_service.config.properties

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration
import org.springframework.stereotype.Component

@ConfigurationProperties(prefix = "integrations.modular-magazine")
data class ModularMagazineProperties(
    val baseUrl: String,
    val studentInfoUri: String

)
