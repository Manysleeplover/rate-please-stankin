package ru.romanov.stankin.authorization_service.service.security

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.entity.security.Role
import ru.romanov.stankin.authorization_service.domain.entity.security.UserEntity
import ru.romanov.stankin.authorization_service.repository.postgre.security.UserRepository


@Service
class UserService(
    private val userRepository: UserRepository
) {
    /**
     * Сохранение пользователя
     * @return сохраненный пользователь
     */
    fun save(user: UserEntity): UserEntity {
        return userRepository.save(user)
    }

    /**
     * Создание пользователя
     * @return созданный пользователь
     */
    fun create(user: UserEntity): UserEntity {
        if (userRepository.existsByUsername(user.getUsername())) {
            // Заменить на свои исключения
            throw RuntimeException("Пользователь с таким именем уже существует")
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw RuntimeException("Пользователь с таким email уже существует")
        }

        return save(user)
    }

    /**
     * Получение пользователя по имени пользователя
     * @return пользователь
     */
    fun getByUsername(username: String?): UserEntity {
        return userRepository.findByUsername(username) ?: throw UsernameNotFoundException("Пользователь не найден")
    }

    /**
     * Получение пользователя по имени пользователя
     * Нужен для Spring Security
     * @return пользователь
     */
    fun userDetailsService(): UserDetailsService {
        return UserDetailsService { username: String? -> this.getByUsername(username) }
    }

    /**
     * Получение текущего пользователя
     * @return текущий пользователь
     */
    fun getCurrentUser(): UserEntity {
        // Получение имени пользователя из контекста Spring Security
        val username = SecurityContextHolder.getContext().authentication.name
        return getByUsername(username)
    }

    /**
     * Выдача прав администратора текущему пользователю
     * Нужен для демонстрации
     */
    @Deprecated("")
    fun setRoleAdminToCurrentUser() {
        val user: UserEntity = getCurrentUser()
        user.setRole(Role.ROLE_ADMIN)
        save(user)
    }

    /**
     * Выдача прав администратора текущему пользователю
     * Нужен для демонстрации
     */
    @Deprecated("")
    fun setRoleUserToCurrentUser() {
        val user: UserEntity = getCurrentUser()
        user.setRole(Role.ROLE_USER)
        save(user)
    }
}