package ru.romanov.stankin.authorization_service.domain.entity.security

import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity

@Entity
@DiscriminatorValue("A")
open class Auditor(
    override var personnelNumber: Int? = null,
    override var name: String,
    override var surname: String,
    override var patronymic: String? = null,
) : Teacher(name = name, surname = surname, patronymic = patronymic, personnelNumber = personnelNumber)