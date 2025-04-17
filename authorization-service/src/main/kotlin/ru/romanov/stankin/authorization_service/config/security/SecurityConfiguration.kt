package ru.romanov.stankin.authorization_service.config.security

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.provisioning.InMemoryUserDetailsManager
import org.springframework.security.provisioning.UserDetailsManager
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import ru.romanov.stankin.authorization_service.service.security.UserService


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
class SecurityConfiguration(
    val jwtAuthenticationFilter: JwtAuthenticationFilter?,
    val userService: UserService,
) {

    @Bean
    @ConditionalOnProperty(value = ["auth.inMemory.enabled"], havingValue = "true")
    fun inMemoryUserDetailsManager(): UserDetailsManager {
        val user: UserDetails = User.withDefaultPasswordEncoder()
            .username("admin")
            .password("admin")
            .authorities("admin")
            .build()

        return InMemoryUserDetailsManager(user)
    }

    @Bean
    @ConditionalOnProperty(value = ["auth.inMemory.enabled"], havingValue = "false")
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http.csrf { obj: AbstractHttpConfigurer<*, *> -> obj.disable() } // Своего рода отключение CORS (разрешение запросов со всех доменов)
            .cors { cors ->
                cors.configurationSource {
                    val corsConfiguration =
                        CorsConfiguration()
                    corsConfiguration.setAllowedOriginPatterns(listOf("*"))
                    corsConfiguration.allowedMethods = listOf(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                    )
                    corsConfiguration.allowedHeaders = listOf("*")
                    corsConfiguration.allowCredentials = true
                    corsConfiguration
                }
            } // Настройка доступа к конечным точкам
            .authorizeHttpRequests { request ->
                request // Можно указать конкретный путь, * - 1 уровень вложенности, ** - любое количество уровней вложенности
                    .requestMatchers("/schedule/**", "/auth/**", "/task/**", "/mj/**").permitAll()
                    .requestMatchers("/swagger-ui/**", "/swagger-resources/*", "/v3/api-docs/**","/schedule/**").permitAll()
                    .requestMatchers("/endpoint", "/admin/**").hasRole("ADMIN")
                    .anyRequest().authenticated()
            }
            .sessionManagement { manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter::class.java)
        return http.build()
    }

    @Bean
    @ConditionalOnProperty(value = ["auth.inMemory.enabled"], havingValue = "false")
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    @ConditionalOnProperty(value = ["auth.inMemory.enabled"], havingValue = "false")
    fun authenticationProvider(): AuthenticationProvider {
        val authProvider = DaoAuthenticationProvider()
        authProvider.setUserDetailsService(userService.userDetailsService())
        authProvider.setPasswordEncoder(passwordEncoder())
        return authProvider
    }

    @Bean
    @ConditionalOnProperty(value = ["auth.inMemory.enabled"], havingValue = "false")
    @Throws(Exception::class)
    fun authenticationManager(config: AuthenticationConfiguration): AuthenticationManager {
        return config.authenticationManager
    }

}