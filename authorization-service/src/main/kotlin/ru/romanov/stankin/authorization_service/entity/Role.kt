package ru.romanov.stankin.authorization_service.entity

import jakarta.persistence.*

@Entity
@Table(name = "roles")
class Role (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val name: String
)


