package ru.romanov.stankin.authorization_service.domain.entity

import jakarta.persistence.*
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

@Entity
@Table(name = "users")
data class UserEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_seq")
    @SequenceGenerator(name = "user_id_seq", sequenceName = "user_id_seq", allocationSize = 1)
    private val id: Long?,
    @Column(name = "username", unique = true, nullable = false)
    private val username: String,
    @Column(name = "password", nullable = false)
    private var password: String,
    @Column(name = "email", unique = true, nullable = false)
    private var email: String,
    @Enumerated(EnumType.STRING)
    private var role: Role
) : UserDetails {
    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableListOf(SimpleGrantedAuthority(role.name))
    }

    fun getId(): Long? {
        return id
    }

    override fun getUsername(): String {
        return username
    }

    override fun getPassword(): String {
        return password
    }

    fun getEmail(): String {
        return email
    }

    fun getRole(): Role {
        return role
    }

    fun setRole(role: Role) {
        this.role = role
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }
}