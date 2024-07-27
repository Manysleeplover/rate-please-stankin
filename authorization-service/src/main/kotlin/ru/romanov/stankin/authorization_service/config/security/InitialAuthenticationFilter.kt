package ru.romanov.stankin.authorization_service.config.security

import com.fasterxml.jackson.databind.ObjectMapper
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.hibernate.ObjectNotFoundException
import org.slf4j.LoggerFactory
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import ru.romanov.stankin.authorization_service.const.AUTHORIZATION
import ru.romanov.stankin.authorization_service.const.BEARER
import ru.romanov.stankin.authorization_service.dto.UserDto
import ru.romanov.stankin.authorization_service.dto.UsernamePasswordAuthentication
import ru.romanov.stankin.authorization_service.service.JwtService

@Component
class InitialAuthenticationFilter(
    val jwtService: JwtService,
    val usernamePasswordAuthenticationProvider: UsernamePasswordAuthenticationProvider
) : OncePerRequestFilter() {


    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        if (request.getHeader(AUTHORIZATION) == null) {
            val bodyJson = request.reader.readLine()
            if (bodyJson != null) {
                val mapper = ObjectMapper()
                val userDto = mapper.readValue(bodyJson, UserDto::class.java)
                val username = userDto.username
                val password = userDto.password
                try {
                    var authentication = UsernamePasswordAuthentication(username, password)
                    authentication = usernamePasswordAuthenticationProvider.authenticate(authentication)
                    val jwt = jwtService.generatedHwt(authentication)
                    response.setHeader(AUTHORIZATION, BEARER + jwt)
                } catch (e: Exception) {
                    when (e) {
                        is BadCredentialsException, is ObjectNotFoundException -> {
                            log.error(e.message)
                            response.status = HttpServletResponse.SC_UNAUTHORIZED
                        }

                        else -> throw e
                    }
                }
            }
        }
    }

    companion object {
        private val log = LoggerFactory.getLogger(InitialAuthenticationFilter::class.java)
    }

}
