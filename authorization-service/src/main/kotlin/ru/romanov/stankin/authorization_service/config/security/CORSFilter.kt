package ru.romanov.stankin.authorization_service.config.security

import jakarta.servlet.Filter
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletRequest
import jakarta.servlet.ServletResponse
import jakarta.servlet.http.HttpServletResponse

class CORSFilter : Filter {


    override fun doFilter(req: ServletRequest?, res: ServletResponse?, chain: FilterChain?) {
        val response = res as HttpServletResponse
        response.setHeader("Access-Control-Allow-Origin", "*")
        response.setHeader("Access-Control-Allow-Credentials", "true")
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE")
        response.setHeader("Access-Control-Max-Age", "3600")
        response.setHeader(
            "Access-Control-Allow-Headers",
            "X-Requested-With, Content-Type, Authorization, Origin, Accept, Access-Control-Request-Method, Access-Control-Request-Headers"
        )
        response.setHeader("Access-Control-Allow-Origin", "*")

        chain?.doFilter(req, res)

    }
}