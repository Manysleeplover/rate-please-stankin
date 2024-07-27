package ru.romanov.stankin.authorization_service.dto

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.GrantedAuthority

class UsernamePasswordAuthentication(
    principal: Any?,
    credentials: Any?,
) : UsernamePasswordAuthenticationToken(principal, credentials) {
    private var authorities: MutableCollection<out GrantedAuthority>? = mutableListOf()

    constructor(principal: Any?, credentials: Any?, authorities: MutableCollection<out GrantedAuthority>?) : this(
        principal,
        credentials,
    ) {
        this.authorities = authorities
    }
}
