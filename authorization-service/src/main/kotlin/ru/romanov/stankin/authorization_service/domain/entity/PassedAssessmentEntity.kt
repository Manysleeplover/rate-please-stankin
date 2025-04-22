package ru.romanov.stankin.authorization_service.domain.entity

import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes
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
        name = "person_id",
        referencedColumnName = "id",
        foreignKey = ForeignKey(name = "fk_person")
    )
    val person: PersonEntity,

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "assessment_id",
        referencedColumnName = "id",
        foreignKey = ForeignKey(name = "fk_assessment")
    )
    val assessment: AssessmentEntity,

    @Column(name = "estimates", nullable = false)
    @JdbcTypeCode(SqlTypes.JSON)
    val estimates: List<AssessmentEstimates>
)

class AssessmentEstimates(
    //Лист вопросов и рейтингов по 10-бальной шкале от студентов
    val answers: List<AssessmentAnswers>,
    //Список тем, которые студенты ожидали
    val tokens: List<String>
)

class AssessmentAnswers (
    val question: String,
    val rate: Int
)

