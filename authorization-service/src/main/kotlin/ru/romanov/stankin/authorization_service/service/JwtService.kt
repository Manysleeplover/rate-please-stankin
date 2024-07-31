package ru.romanov.stankin.authorization_service.service

import io.jsonwebtoken.Claims
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.dto.JwtDTO

interface JwtService {

    fun isValidJwt(jwtDTO: JwtDTO): Boolean
    fun getClaims(authorizationKey: String): Claims
    fun generatedHwt(authentication: Authentication): String

}
