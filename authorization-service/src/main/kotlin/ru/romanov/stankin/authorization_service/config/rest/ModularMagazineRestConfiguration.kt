package ru.romanov.stankin.authorization_service.config.rest

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.client.RestClient
import ru.romanov.stankin.authorization_service.config.properties.ModularMagazineProperties

@Configuration
class ModularMagazineRestConfiguration(
    private val modularMagazineProperties: ModularMagazineProperties
) {
    @Bean("modularMagazineRestClient")
    fun modularMagazineRestClient() =
        RestClient
            .builder()
            .baseUrl(modularMagazineProperties.baseUrl)
            .build()

}