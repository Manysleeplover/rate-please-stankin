package ru.romanov.stankin.authorization_service.config.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter


@Configuration
class WebSecurityConfiguration {

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    fun filterChain(
        http: HttpSecurity,
        initialAuthenticationFilter: InitialAuthenticationFilter,
        jwtAuthorizationFilter: JwtAuthorizationFilter
    ): SecurityFilterChain {

        http.addFilterAt(initialAuthenticationFilter, BasicAuthenticationFilter::class.java)
            .addFilterAt(jwtAuthorizationFilter, BasicAuthenticationFilter::class.java)

//        http.authorizeHttpRequests {
//            it
//                .requestMatchers("/h2-console/**").permitAll()
//                .anyRequest().authenticated()
//        }

        http.headers { headers -> headers.frameOptions(HeadersConfigurer<HttpSecurity>.FrameOptionsConfig::sameOrigin) }
            .csrf(CsrfConfigurer<HttpSecurity>::disable)
            .cors(CorsConfigurer<HttpSecurity>::disable);



        http
            .authorizeHttpRequests { it.anyRequest().authenticated() }
            .httpBasic(Customizer.withDefaults())
        return http.build()
    }

}