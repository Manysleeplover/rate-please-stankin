package ru.romanov.stankin.authorization_service.util

import ru.romanov.stankin.authorization_service.domain.dto.mj.UserInfoDTO
import ru.romanov.stankin.authorization_service.domain.entity.security.Student
import ru.romanov.stankin.authorization_service.domain.entity.security.UserEntity

fun buildStudentEntity(userInfoDTO: UserInfoDTO, userEntity: UserEntity) =
    Student(
        name = userInfoDTO.name,
        surname = userInfoDTO.surname,
        patronymic = userInfoDTO.patronym,
        cardId = userInfoDTO.cardid.toInt(),
        group = userInfoDTO.stgroup,
        user = userEntity,
    )