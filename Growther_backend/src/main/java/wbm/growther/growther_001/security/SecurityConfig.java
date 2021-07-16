package wbm.growther.growther_001.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import wbm.growther.growther_001.oath.CustomOAuth2User;
import wbm.growther.growther_001.oath.CutomOAuth2UserService;
import wbm.growther.growther_001.oath.OAuth2LoginSuccessHandler;
import wbm.growther.growther_001.services.CustomUserService;
import wbm.growther.growther_001.services.UserService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private DataSource dataSource;

    @Bean
    public UserDetailsService userDetailsService(){
        return new CustomUserService();
    }

    @Autowired
    private CutomOAuth2UserService cutomOAuth2UserService;

    @Autowired
    private OAuth2LoginSuccessHandler loginSuccessHandler;


    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Override
    public void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeRequests()
                .antMatchers("/oauth2/**").permitAll()
                .antMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
                .and()
                .oauth2Login()
                    .userInfoEndpoint().userService(cutomOAuth2UserService)
                    .and()
                    .successHandler(new AuthenticationSuccessHandler() {
                        @Override
                        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                                            Authentication authentication) throws IOException, ServletException {
                            System.out.println("AuthenticationSuccessHandler invoked");
                            System.out.println("Authentication name: " + authentication.getName());
                            //CustomOAuth2User oauthUser = (CustomOAuth2User) authentication.getPrincipal();
                            Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
                            String userName = loggedInUser.getName();
                            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
                            String provider= oAuth2User.getClientName();
                            String email= oAuth2User.getEmail();
                            userService.processOAuthPostLogin(userName,email,provider);

                            response.sendRedirect("/api/users");
                        }
                    })
                .and()
                .logout().permitAll();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }
    @Autowired
    private UserService userService;
}
