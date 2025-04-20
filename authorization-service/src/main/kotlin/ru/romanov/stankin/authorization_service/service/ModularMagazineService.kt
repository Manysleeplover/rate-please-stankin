package ru.romanov.stankin.authorization_service.service

import jakarta.transaction.Transactional
import org.springframework.http.MediaType
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.client.RestClient
import ru.romanov.stankin.authorization_service.config.properties.ModularMagazineProperties
import ru.romanov.stankin.authorization_service.domain.dto.mj.MJStudentDataRequestDTO
import ru.romanov.stankin.authorization_service.domain.dto.mj.StudentInfoDTO
import ru.romanov.stankin.authorization_service.domain.dto.mj.UserInfoDTO
import ru.romanov.stankin.authorization_service.repository.PersonRepository
import ru.romanov.stankin.authorization_service.repository.security.UserRepository
import ru.romanov.stankin.authorization_service.util.buildStudentEntity


@Service
class ModularMagazineService(
    private val modularMagazineRestClient: RestClient,
    private val modularMagazineProperties: ModularMagazineProperties,
    private val userRepository: UserRepository,
    private val personRepository: PersonRepository
) {
    fun getStudentInfo(req: MJStudentDataRequestDTO): StudentInfoDTO {
        val formData: MultiValueMap<String, String> = LinkedMultiValueMap()
        formData.add("code", req.code)
        formData.add("client_id", req.clientId,)
        formData.add("client_secret", req.clientSecret,)
         return modularMagazineRestClient
            .post()
            .uri(modularMagazineProperties.studentInfoUri)
            .contentType(
                MediaType.APPLICATION_FORM_URLENCODED
            )
            .body(formData)
            .retrieve()
            .toEntity(StudentInfoDTO::class.java)
            .body!!
    }


    @Transactional
    fun secureStudentProfileByUsername(req: UserInfoDTO) {
        val name = SecurityContextHolder.getContext().authentication.name
        val userEntity = userRepository.findByUsername(name)
        userEntity?.also {
            val personEntity = personRepository.save(buildStudentEntity(req, it))
            it.person = personEntity
            userRepository.save(it)
        }
    }



}
