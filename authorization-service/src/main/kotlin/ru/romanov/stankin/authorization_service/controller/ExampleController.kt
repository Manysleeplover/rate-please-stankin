package ru.romanov.stankin.authorization_service.controller

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.romanov.stankin.authorization_service.service.security.UserService


@RestController
@RequestMapping("/example")
@Tag(name = "Примеры", description = "Примеры запросов с разными правами доступа")
class ExampleController(
    private val userService: UserService,
) {

    @GetMapping
    @Operation(summary = "Доступен только авторизованным пользователям")
    fun example(): String {
        return "Hello, world!"
    }

    @GetMapping("/admin")
    @Operation(summary = "Доступен только авторизованным пользователям с ролью ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    fun exampleAdmin(): String {
        return "Hello, admin!"
    }

    @GetMapping("/get-admin")
    @Operation(summary = "Получить роль ADMIN (для демонстрации)")
    fun getAdmin() {
        userService.setRoleAdminToCurrentUser()
    }

    @GetMapping("/get-usern")
    @Operation(summary = "Получить роль ADMIN (для демонстрации)")
    fun getUser() {
        userService.setRoleUserToCurrentUser()
    }
}