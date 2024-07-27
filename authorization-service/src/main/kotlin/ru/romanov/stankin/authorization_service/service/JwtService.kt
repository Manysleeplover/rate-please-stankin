package ru.romanov.stankin.authorization_service.service

import io.jsonwebtoken.Claims
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.dto.JwtDTO

@Service
class JwtService {


    fun isValidJwt(jwtDTO: JwtDTO): Boolean {
        TODO("Not yet implemented")
    }

    fun getClaims(authorizationKey: String): Claims {
        TODO("Not yet implemented")
    }

    fun generatedHwt(authentication: Authentication): Any {
        TODO("Not yet implemented")
    }

}
