package ru.romanov.stankin.authorization_service.controller

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.romanov.stankin.authorization_service.domain.dto.mj.MJStudentDataRequestDTO
import ru.romanov.stankin.authorization_service.service.ModularMagazineService


@RestController
@RequestMapping("/mj")
class ModularMagazineController(
    private val modularMagazineService: ModularMagazineService
) {

    @PostMapping("/oaut/req")
    fun getStudentInfo(@RequestBody req: MJStudentDataRequestDTO) =
        modularMagazineService.getStudentInfo(req)


}