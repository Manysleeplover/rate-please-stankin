package ru.romanov.rateplease

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ComponentBuilderService

fun main(args: Array<String>) {
	runApplication<ComponentBuilderService>(*args)
}
