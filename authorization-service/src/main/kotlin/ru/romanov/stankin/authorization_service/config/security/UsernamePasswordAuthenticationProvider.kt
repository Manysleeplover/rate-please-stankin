package ru.romanov.stankin.authorization_service.config.security

import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component

@Component
class UsernamePasswordAuthenticationProvider(
    val userDetailsService: UserDetailsService,
    val passwordEncoder: PasswordEncoder
) {
    fun authenticate(authentication: Authentication): Authentication {
        val username: String = authentication.name
        val password: String = authentication.credentials.toString()

        val userDetails = userDetailsService.loadUserByUsername(username)
        if (passwordEncoder.matches(password, userDetails.password)) {
            return UsernamePasswordAuthenticationToken(username, password, userDetails.authorities)
        } else {
            throw BadCredentialsException("Bad credentials")
        }
    }

}
