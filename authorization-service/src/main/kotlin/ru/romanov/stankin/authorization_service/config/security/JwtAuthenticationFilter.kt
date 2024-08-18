package ru.romanov.stankin.authorization_service.config.security

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory.getLogger
import org.springframework.lang.NonNull
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import ru.romanov.stankin.authorization_service.service.JwtService
import ru.romanov.stankin.authorization_service.service.UserService


@Component
class JwtAuthenticationFilter(
    val jwtService: JwtService,
    val userService: UserService,
) : OncePerRequestFilter() {

    private val BEARER_PREFIX = "Bearer"
    private val HEADER_NAME = "Authorization"


    override fun doFilterInternal(
        @NonNull request: HttpServletRequest,
        @NonNull response: HttpServletResponse,
        @NonNull filterChain: FilterChain
    ) {

        // Получаем токен из заголовка
        val authHeader: String = request.getHeader(HEADER_NAME)


        if (authHeader.isEmpty() || authHeader.startsWith(BEARER_PREFIX)) {
            filterChain.doFilter(request, response)
            return
        }


        // Обрезаем префикс и получаем имя пользователя из токена
        val jwt: String = authHeader.substring(BEARER_PREFIX.length)
        val username = jwtService.extractUserName(jwt)

        if (username.isNotEmpty() && SecurityContextHolder.getContext().authentication == null) {
            val userDetails = userService
                .userDetailsService()
                .loadUserByUsername(username)

            // Если токен валиден, то аутентифицируем пользователя
            if (jwtService.isTokenValid(jwt, userDetails)) {
                val context = SecurityContextHolder.createEmptyContext()

                val authToken = UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.authorities
                )

                authToken.details = WebAuthenticationDetailsSource().buildDetails(request)
                context.authentication = authToken
                SecurityContextHolder.setContext(context)
            }
        }
        filterChain.doFilter(request, response)
    }

    companion object {
        private val log = getLogger(OncePerRequestFilter::class.java)
    }

}
