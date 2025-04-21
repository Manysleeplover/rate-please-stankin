package ru.romanov.stankin.authorization_service.domain.entity

import jakarta.persistence.*
import ru.romanov.stankin.authorization_service.domain.entity.security.PersonEntity
import java.util.*


@Entity
@Table(name = "passed_assessment")
class PassedAssessmentEntity (
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "assessment_id",
        referencedColumnName = "id",
        foreignKey = ForeignKey(name = "fk_assessment")
    )
    val assessment: AssessmentEntity,

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "person_id",
        referencedColumnName = "id",
        foreignKey = ForeignKey(name = "fk_person")
    )
    val person: PersonEntity,
)