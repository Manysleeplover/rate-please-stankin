package ru.romanov.stankin.authorization_service.domain.dto.security

import io.swagger.v3.oas.annotations.media.Schema
import ru.romanov.stankin.authorization_service.domain.entity.security.Role

@Schema(description = "Ответ c токеном доступа")
class JwtAuthenticationResponse(
    val id: Long?,
    @Schema(description = "Токен доступа", example = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYyMjUwNj...")
    val token: String,
    val name: String,
    val email: String,
    val role: Role,
)