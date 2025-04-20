package ru.romanov.stankin.authorization_service.domain.entity

import jakarta.persistence.*
import ru.romanov.stankin.authorization_service.domain.entity.security.PersonEntity
import java.util.UUID

@Entity
@Table(name = "passed_test")
class PassedTestEntity(
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID? = null,

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "task_for_class_id",
        referencedColumnName = "id",
        foreignKey = ForeignKey(name = "fk_task_for_class")
    )
    val taskForClass: TaskForClassEntity,

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "person_id",
        referencedColumnName = "id",
        foreignKey = ForeignKey(name = "fk_person")
    )
    val person: PersonEntity,

    @Column(name = "completion_percent", nullable = false)
    val completionPercent: Int
)