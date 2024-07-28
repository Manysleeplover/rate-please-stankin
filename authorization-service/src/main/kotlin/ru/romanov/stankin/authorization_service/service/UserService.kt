package ru.romanov.stankin.authorization_service.service

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.dto.UserDetailsCustomDTO
import ru.romanov.stankin.authorization_service.repository.UserRepository

@Service
class UserService(
    private val userRepository: UserRepository
) : UserDetailsService {
     override fun loadUserByUsername(username: String?): UserDetails {
        return UserDetailsCustomDTO(
            userRepository.findByUsername(username) ?: throw UsernameNotFoundException("User not found: $username")
        )
    }
}