package ru.romanov.stankin.authorization_service.config.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder


@Configuration
class WebSecurityConfiguration {

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

//    @Bean
//    fun filterChain(
//        http: HttpSecurity,
//        initialAuthenticationFilter: InitialAuthenticationFilter,
//        jwtAuthorizationFilter: JwtAuthorizationFilter
//    ): SecurityFilterChain {
//
//        http
//            .authorizeHttpRequests { it.anyRequest().authenticated() }
//            .httpBasic(Customizer.withDefaults())
//        return http.build()
//    }

}