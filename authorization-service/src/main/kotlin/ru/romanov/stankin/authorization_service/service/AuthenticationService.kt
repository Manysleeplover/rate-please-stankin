package ru.romanov.stankin.authorization_service.service

import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.dto.JwtAuthenticationResponse
import ru.romanov.stankin.authorization_service.domain.dto.SignInRequestDTO
import ru.romanov.stankin.authorization_service.domain.dto.SignUpRequestDTO
import ru.romanov.stankin.authorization_service.domain.entity.Role
import ru.romanov.stankin.authorization_service.domain.entity.UserEntity


@Service
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
        val user  = UserEntity(
            id = null,
            username = request.username,
            email = request.email,
            password = passwordEncoder.encode(request.password),
            role = Role.ROLE_USER
        )

        userService.create(user)

        val jwt = jwtService.generateToken(user)
        return JwtAuthenticationResponse(jwt)
    }

    /**
     * Аутентификация пользователя
     *
     * @param request данные пользователя
     * @return токен
     */
    fun signIn(request: SignInRequestDTO): JwtAuthenticationResponse {
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
        return JwtAuthenticationResponse(jwt)
    }

}