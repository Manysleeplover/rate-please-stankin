package ru.romanov.stankin.authorization_service.controller

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import ru.romanov.stankin.authorization_service.domain.dto.mj.MJStudentDataRequestDTO
import ru.romanov.stankin.authorization_service.domain.dto.mj.UserInfoDTO
import ru.romanov.stankin.authorization_service.service.ModularMagazineService


@RestController
@RequestMapping("/mj")
class ModularMagazineController(
    private val modularMagazineService: ModularMagazineService
) {

    @PostMapping("/oaut/req")
    fun getStudentInfo(@RequestBody req: MJStudentDataRequestDTO) =
        modularMagazineService.getStudentInfo(req)

    @PostMapping("/profile/secure")
    @ResponseStatus(HttpStatus.OK)
    fun secureStudentProfile(@RequestBody req: UserInfoDTO) =
        modularMagazineService.secureStudentProfileByUsername(req)


}