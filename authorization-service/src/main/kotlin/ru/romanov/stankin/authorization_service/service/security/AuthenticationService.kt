package ru.romanov.stankin.authorization_service.service.security

import org.slf4j.LoggerFactory.getLogger
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.dto.security.JwtAuthenticationResponse
import ru.romanov.stankin.authorization_service.domain.dto.security.SignInRequestDTO
import ru.romanov.stankin.authorization_service.domain.dto.security.SignUpRequestDTO
import ru.romanov.stankin.authorization_service.domain.entity.security.Role
import ru.romanov.stankin.authorization_service.domain.entity.security.UserEntity


@Service
@ConditionalOnProperty(value = ["auth.inMemory.enabled"], havingValue = "false")
class AuthenticationService(
    val userService: UserService,
    val jwtService: JwtService,
    val passwordEncoder: PasswordEncoder,
    val authenticationManager: AuthenticationManager,
) {

    /**
     * Регистрация пользователя
     *
     * @param request данные пользователя
     * @return токен
     */
    fun signUp(request: SignUpRequestDTO): JwtAuthenticationResponse {
        log.info("Пришёл запрос на регистрацию от ${request.username}")

        val user  = UserEntity(
            id = null,
            username = request.username,
            email = request.email,
            password = passwordEncoder.encode(request.password),
            role = Role.ROLE_USER,
        )

        userService.create(user)

        val jwt = jwtService.generateToken(user)


        log.info("Регистрация пользователя ${request.username} прошла успешна")
        return JwtAuthenticationResponse(
            id = user.id,
            email = user.email,
            token = jwt,
            name = user.username,
            role = user.role,
        )
    }

    /**
     * Аутентификация пользователя
     *
     * @param request данные пользователя
     * @return токен
     */
    fun signIn(request: SignInRequestDTO): JwtAuthenticationResponse {
        log.info("Пришёл запрос на аутентификацию от ${request.username}")

        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(
                request.username,
                request.password
            )
        )

        val user = userService
            .userDetailsService()
            .loadUserByUsername(request.username)

        val jwt = jwtService.generateToken(user)
        val currentUser = userService.getByUsername(request.username)

        log.info("Аутентификация пользователя ${request.username} прошла успешна")
        return JwtAuthenticationResponse(
            id = currentUser.id,
            email = currentUser.email,
            token = jwt,
            name = currentUser.username,
            role = currentUser.role,
        )
    }

    companion object {
        private val log = getLogger(AuthenticationService::class.java)
    }

}