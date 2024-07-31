package ru.romanov.stankin.authorization_service.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import ru.romanov.stankin.authorization_service.repository.UserRepository

@RestController("/user")
class UserController(
    private val repository: UserRepository
) {

    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping("/get/myname")
    fun getName(): ResponseEntity<String> {
        return ResponseEntity.status(HttpStatus.OK)
            .body(SecurityContextHolder.getContext().authentication.name)
    }

}