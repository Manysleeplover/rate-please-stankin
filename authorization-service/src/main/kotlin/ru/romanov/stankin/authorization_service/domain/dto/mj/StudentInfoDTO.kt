package ru.romanov.stankin.authorization_service.domain.dto.mj

import com.fasterxml.jackson.annotation.JsonProperty

data class StudentInfoDTO(
    @JsonProperty("access_token")
    val accessToken: String,
    @JsonProperty("token_type")
    val tokenType: String,
    val userInfo: UserInfoDTO
)

data class UserInfoDTO(
    val name: String,
    val surname: String,
    val patronym: String,
    val stgroup: String,
    val cardid: String
)