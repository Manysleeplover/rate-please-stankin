package ru.romanov.stankin.authorization_service.controller.advice

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import ru.romanov.stankin.authorization_service.domain.dto.exceptions.CommonExceptionDTO
import java.time.LocalDateTime

@ControllerAdvice
class ControllerAdvice {

    @ExceptionHandler(Exception::class)
    fun commonExceptionHandler(exception: Exception, request: WebRequest): ResponseEntity<CommonExceptionDTO> {
        return ResponseEntity(CommonExceptionDTO(
                    message = exception.localizedMessage,
                    timestamp = LocalDateTime.now(),
                    trace = exception.stackTrace.toString(),
                    status = HttpStatus.INTERNAL_SERVER_ERROR.value(),
                ),
                HttpStatus.INTERNAL_SERVER_ERROR )
    }
}