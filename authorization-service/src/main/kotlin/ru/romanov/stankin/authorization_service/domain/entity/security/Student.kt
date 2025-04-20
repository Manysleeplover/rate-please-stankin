package ru.romanov.stankin.authorization_service.domain.entity.security

import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity

@Entity
@DiscriminatorValue("S")
open class Student(
    @Column(name = "student_group", length = 15)
    open var group: String,
    @Column(name = "cardid")
    open var cardId: Int? = null,
    override var name: String,
    override var surname: String,
    override var patronymic: String? = null,
    override var user: UserEntity,
) : Person(name = name, surname = surname, patronymic = patronymic, user = user)