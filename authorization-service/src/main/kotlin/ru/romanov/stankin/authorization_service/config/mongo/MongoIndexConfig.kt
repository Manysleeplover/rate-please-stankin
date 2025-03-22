package ru.romanov.stankin.authorization_service.config.mongo

import jakarta.annotation.PostConstruct
import org.springframework.context.annotation.Configuration
import org.springframework.data.domain.Sort
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.index.Index

@Configuration
class MongoIndexConfig(private val mongoTemplate: MongoTemplate){

    @PostConstruct
    fun createIndex() {
        val indexOps = mongoTemplate.indexOps("semester_schedule")
        val compoundIndex = Index()
            .on("firstClassDate", Sort.Direction.ASC)
            .on("lastClassDate", Sort.Direction.DESC)
            .on("stgroup", Sort.Direction.ASC)
            .named("semester_schedule_idx")
            .unique()

        indexOps.ensureIndex(compoundIndex)
    }

}