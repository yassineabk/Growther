package wbm.growther.growther_001.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import wbm.growther.growther_001.dtos.UserDto;
import wbm.growther.growther_001.models.AuthenticationProvider;
import wbm.growther.growther_001.models.users.User;
import wbm.growther.growther_001.payload.ApiResponse;
import wbm.growther.growther_001.payload.AuthResponse;
import wbm.growther.growther_001.repository.UserRepository;
import wbm.growther.growther_001.utils.JwtUtils;

import java.net.URI;


@RestController
@RequestMapping("/authentication")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody UserDto loginRequest ) {

        System.out.println(loginRequest.getEmail());
        System.out.println(loginRequest.getPassword());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtUtils.createToken(authentication);

        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDto signUpRequest) {
        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Email address already in use.");
        }

        // Creating user's account
        User user =new  User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setAuthProvider(AuthenticationProvider.LOCAL);
        if(signUpRequest.isBrand()){
            user.setUrl(signUpRequest.getUrl());
            user.setBrand(true);
        }
        else user.setBrand(false);

        User result = userRepository.save(user);

        /*URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(result.getId()).toUri();*/

        return ResponseEntity.ok(new ApiResponse(true, "User registered successfully "));
    }

}
