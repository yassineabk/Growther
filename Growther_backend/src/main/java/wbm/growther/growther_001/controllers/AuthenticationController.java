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
import wbm.growther.growther_001.dtos.BrandDto;
import wbm.growther.growther_001.models.AuthenticationProvider;
import wbm.growther.growther_001.models.users.Brand;
import wbm.growther.growther_001.payload.ApiResponse;
import wbm.growther.growther_001.payload.AuthResponse;
import wbm.growther.growther_001.repository.BrandRepository;
import wbm.growther.growther_001.utils.JwtUtils;

import java.net.URI;


@RestController
@RequestMapping("/authentication")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody BrandDto loginRequest ) {

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
    public ResponseEntity<?> registerUser(@RequestBody BrandDto signUpRequest) {
        if(brandRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Email address already in use.");
        }

        // Creating user's account
        Brand brand = new Brand();
        brand.setName(signUpRequest.getName());
        brand.setEmail(signUpRequest.getEmail());
        brand.setPassword(signUpRequest.getPassword());
        brand.setUrl(signUpRequest.getUrl());
        brand.setAuthProvider(AuthenticationProvider.LOCAL);

        brand.setPassword(passwordEncoder.encode(brand.getPassword()));

        Brand result = brandRepository.save(brand);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "User registered successfully "));
    }

}
