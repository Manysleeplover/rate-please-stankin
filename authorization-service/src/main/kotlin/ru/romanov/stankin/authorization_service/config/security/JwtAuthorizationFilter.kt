package ru.romanov.stankin.authorization_service.config.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.JwtException
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory.getLogger
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import ru.romanov.stankin.authorization_service.const.AUTHORIZATION
import ru.romanov.stankin.authorization_service.const.BEARER
import ru.romanov.stankin.authorization_service.const.ROLE
import ru.romanov.stankin.authorization_service.const.USERNAME
import ru.romanov.stankin.authorization_service.dto.JwtDTO
import ru.romanov.stankin.authorization_service.dto.UsernamePasswordAuthentication
import ru.romanov.stankin.authorization_service.service.JwtService

@Component
class JwtAuthorizationFilter(
    val jwtService: JwtService
) : OncePerRequestFilter() {


    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        var authorizationKey: String? = request.getHeader(AUTHORIZATION)
        if (!authorizationKey.isNullOrBlank() && authorizationKey.startsWith(BEARER)) {
            authorizationKey = authorizationKey.replace(BEARER, "")
            try {
                if (jwtService.isValidJwt(JwtDTO(authorizationKey))) {
                    val claims: Claims = jwtService.getClaims(authorizationKey)
                    val username: String = claims[USERNAME].toString()
                    val roles = claims.get(ROLE, List::class.java)
                    val authorities = roles.map { SimpleGrantedAuthority(it.toString()) }.toCollection(mutableListOf())
                    val authentication: UsernamePasswordAuthenticationToken =
                        UsernamePasswordAuthentication(username, null, authorities)
                    SecurityContextHolder.getContext().authentication = authentication
                }
            } catch (e: JwtException) {
                log.error(e.message)
                SecurityContextHolder.getContext().authentication = null
                response.status = HttpServletResponse.SC_NOT_ACCEPTABLE

            }
        }
        filterChain.doFilter(request, response)
    }

    override fun shouldNotFilter(request: HttpServletRequest): Boolean {
        return request.servletPath.equals("/login")
    }

    companion object {
        private val log = getLogger(OncePerRequestFilter::class.java)
    }

}
