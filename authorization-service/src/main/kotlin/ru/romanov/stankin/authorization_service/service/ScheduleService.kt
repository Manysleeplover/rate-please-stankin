package ru.romanov.stankin.authorization_service.service

import org.springframework.stereotype.Service
import ru.romanov.stankin.authorization_service.domain.dto.FullScheduleDTO
import ru.romanov.stankin.authorization_service.domain.dto.ScheduleDto

@Service
class ScheduleService {

    fun processSchedule(listOfSubjects: FullScheduleDTO){
        println("говно")
        println(listOfSubjects)
    }

}
