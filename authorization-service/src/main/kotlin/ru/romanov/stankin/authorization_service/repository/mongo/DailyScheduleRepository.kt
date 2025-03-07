package ru.romanov.stankin.authorization_service.repository.mongo

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository
import ru.romanov.stankin.authorization_service.domain.entity.mongo.DailySchedule

@Repository
interface DailyScheduleRepository : MongoRepository<DailySchedule, String> {


}