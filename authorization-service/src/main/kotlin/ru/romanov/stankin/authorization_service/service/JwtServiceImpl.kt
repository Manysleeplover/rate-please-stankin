package ru.romanov.stankin.authorization_service.service

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.const.ROLE
import ru.romanov.stankin.authorization_service.const.USERNAME
import ru.romanov.stankin.authorization_service.const.USER_ID
import ru.romanov.stankin.authorization_service.dto.JwtDTO
import ru.romanov.stankin.authorization_service.repository.UserRepository
import java.util.*
import javax.crypto.SecretKey
import javax.crypto.spec.SecretKeySpec

@Service
class JwtServiceImpl(
    @Value("\${jwt.signing.key}") private val singingKey: String,
    @Value("\${jwt.key.expiration}") private var jwtExpiration: Long,
    private val userRepository: UserRepository,
) : JwtService {

    private val key: SecretKey? = null
        get() {
            return field ?: Keys.hmacShaKeyFor(singingKey.toByteArray())
        }

    override fun generatedHwt(authentication: Authentication): String {
        return Jwts.builder()
            .claims(
                mapOf(
                    USERNAME to authentication.name,
                    ROLE to authentication.authorities.map { it.authority }.toCollection(mutableListOf()),
                    USER_ID to userRepository.findByUsername(authentication.name)?.id
                )
            )
            .expiration(Date(System.currentTimeMillis() + jwtExpiration))
            .subject(authentication.name)
            .signWith(key)
            .compact()
    }

    override fun getClaims(authorizationKey: String): Claims {
        return Jwts.parser().build().parseClaims
    }

    override fun isValidJwt(jwtDTO: JwtDTO): Boolean {
        TODO("Not yet implemented")

    }

}