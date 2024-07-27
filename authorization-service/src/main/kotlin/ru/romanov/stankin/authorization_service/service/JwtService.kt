package ru.romanov.stankin.authorization_service.service

import io.jsonwebtoken.Claims
import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.dto.JwtDTO
import ru.romanov.stankin.authorization_service.dto.UsernamePasswordAuthentication

@Service
class JwtService {


    fun isValidJwt(jwtDTO: JwtDTO): Boolean {
        TODO("Not yet implemented")
    }

    fun getClaims(authorizationKey: String): Claims {
        TODO("Not yet implemented")
    }

    fun generatedHwt(authentication: UsernamePasswordAuthentication): Any {
        TODO("Not yet implemented")
    }

}
