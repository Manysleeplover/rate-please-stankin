package ru.romanov.stankin.authorization_service.controller

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.romanov.stankin.authorization_service.domain.dto.JwtAuthenticationResponse
import ru.romanov.stankin.authorization_service.domain.dto.SignInRequestDTO
import ru.romanov.stankin.authorization_service.domain.dto.SignUpRequestDTO
import ru.romanov.stankin.authorization_service.service.AuthenticationService


@RestController
@RequestMapping("/auth")
@Tag(name = "Аутентификация")
class AuthController (
    private val authenticationService: AuthenticationService?,
){

    @Operation(summary = "Регистрация пользователя")
    @PostMapping("/sign-up")
    fun signUp(@RequestBody request: @Valid SignUpRequestDTO): JwtAuthenticationResponse {
        return authenticationService!!.signUp(request)
    }

    @Operation(summary = "Авторизация пользователя")
    @PostMapping("/sign-in")
    fun signIn(@RequestBody request: @Valid SignInRequestDTO): JwtAuthenticationResponse {
        return authenticationService!!.signIn(request)
    }

}