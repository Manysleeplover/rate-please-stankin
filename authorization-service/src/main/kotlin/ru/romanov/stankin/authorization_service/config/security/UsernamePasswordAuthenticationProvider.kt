package ru.romanov.stankin.authorization_service.config.security

import org.springframework.stereotype.Component
import ru.romanov.stankin.authorization_service.dto.UsernamePasswordAuthentication

@Component
class UsernamePasswordAuthenticationProvider {
    fun authenticate(authentication: UsernamePasswordAuthentication): UsernamePasswordAuthentication {
        TODO("Not yet implemented")
    }

}
