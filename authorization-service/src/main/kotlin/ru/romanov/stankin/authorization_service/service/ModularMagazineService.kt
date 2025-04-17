package ru.romanov.stankin.authorization_service.service

import org.springframework.http.MediaType
import org.springframework.stereotype.Service
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.client.RestClient
import ru.romanov.stankin.authorization_service.config.properties.ModularMagazineProperties
import ru.romanov.stankin.authorization_service.domain.dto.mj.MJStudentDataRequestDTO
import ru.romanov.stankin.authorization_service.domain.dto.mj.StudentInfoDTO


@Service
class ModularMagazineService(
    private val modularMagazineRestClient: RestClient,
    private val modularMagazineProperties: ModularMagazineProperties
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
}
