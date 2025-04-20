package ru.romanov.stankin.authorization_service.domain.entity.security

import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity

@Entity
@DiscriminatorValue("T")
open class Teacher(
    @Column(name = "personnel_number")
    open var personnelNumber: Int? = null,

    override var name: String,
    override var surname: String,
    override var patronymic: String? = null,
) : Person(name = name, surname = surname, patronymic = patronymic)