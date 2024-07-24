package ru.romanov.stankin.authorization_service.config.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain


@Configuration
class SecurityConfiguration {

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {

        http
            .authorizeHttpRequests { it.anyRequest().authenticated() }
            .httpBasic(Customizer.withDefaults())
        return http.build()
    }

}