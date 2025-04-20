package ru.romanov.stankin.authorization_service.domain.entity.security

import jakarta.persistence.*


@Entity
@Table(name = "person")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "member_type", discriminatorType = DiscriminatorType.CHAR)
@DiscriminatorValue("P")
open class Person(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    open val id: Long? = null,

    @Column(name = "name", nullable = false, length = 127)
    open val name: String,

    @Column(name = "surname", nullable = false, length = 127)
    open val surname: String,

    @Column(name = "patronymic", length = 127)
    open val patronymic: String? = null,

    @OneToOne
    open val user: UserEntity? = null

)