package ru.romanov.stankin.authorization_service.controller

import jakarta.servlet.http.HttpServletRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/mj")
class ModularMagazineController {

    @GetMapping("/oaut/resp")
    fun getStudentInfo(@RequestParam code: String ,req: HttpServletRequest) {
        println(code)
        println(req)
    }

}