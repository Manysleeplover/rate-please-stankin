package ru.romanov.stankin.authorization_service.service.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.entity.postgres.security.UserEntity
import ru.romanov.stankin.authorization_service.repository.postgre.security.UserRepository
import java.security.Key
import java.util.*


@Service
class JwtService(
    @Value("\${jwt.signing.key}") private val singingKey: String,
    @Value("\${jwt.key.expiration}") private var jwtExpiration: Long,
    private val userRepository: UserRepository,
) {

    /**
     * Извлечение имени пользователя из токена
     *
     * @param token токен
     * @return имя пользователя
     */
    fun extractUserName(token: String): String {
        return extractClaim(token, Claims::getSubject)
    }

    /**
     * Генерация токена
     *
     * @param userDetails данные пользователя
     * @return токен
     */
    fun generateToken(userDetails: UserDetails): String {
        val claims: MutableMap<String, Any?> = HashMap()
        if (userDetails is UserEntity) {
            claims["id"] = userDetails.getId()
            claims["email"] = userDetails.getEmail()
            claims["role"] = userDetails.getRole()
        }
        return generateToken(claims, userDetails)
    }

    /**
     * Проверка токена на валидность
     *
     * @param token       токен
     * @param userDetails данные пользователя
     * @return true, если токен валиден
     */
    fun isTokenValid(token: String, userDetails: UserDetails): Boolean {
        val userName = extractUserName(token)
        return (userName == userDetails.username) && !isTokenExpired(token)
    }

    /**
     * Извлечение данных из токена
     *
     * @param token           токен
     * @param claimsResolvers функция извлечения данных
     * @param <T>             тип данных
     * @return данные
    </T> */
    private fun <T> extractClaim(token: String, claimsResolvers: java.util.function.Function<Claims, T>): T {
        val claims = extractAllClaims(token)
        return claimsResolvers.apply(claims)
    }

    /**
     * Генерация токена
     *
     * @param extraClaims дополнительные данные
     * @param userDetails данные пользователя
     * @return токен
     */
    private fun generateToken(extraClaims: Map<String, Any?>, userDetails: UserDetails): String {
        return Jwts.builder().claims(extraClaims).subject(userDetails.username)
            .issuedAt(Date())
            .expiration(Date(System.currentTimeMillis() + jwtExpiration))
            .signWith(getSigningKey()).compact()
    }

    /**
     * Проверка токена на просроченность
     *
     * @param token токен
     * @return true, если токен просрочен
     */
    private fun isTokenExpired(token: String): Boolean {
        return extractExpiration(token).before(Date())
    }

    /**
     * Извлечение даты истечения токена
     *
     * @param token токен
     * @return дата истечения
     */
    private fun extractExpiration(token: String): Date {
        return extractClaim(token, Claims::getExpiration)
    }

    /**
     * Извлечение всех данных из токена
     *
     * @param token токен
     * @return данные
     */
    private fun extractAllClaims(token: String): Claims {
        return Jwts.parser().setSigningKey(getSigningKey()).build().parseClaimsJws(token)
            .getBody()
    }

    /**
     * Получение ключа для подписи токена
     *
     * @return ключ
     */
    private fun getSigningKey(): Key {
        val keyBytes = Decoders.BASE64.decode(singingKey)
        return Keys.hmacShaKeyFor(keyBytes)
    }
}