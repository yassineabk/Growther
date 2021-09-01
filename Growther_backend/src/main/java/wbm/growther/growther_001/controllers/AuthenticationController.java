package wbm.growther.growther_001.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import wbm.growther.growther_001.dtos.UserDto;

import wbm.growther.growther_001.payload.ApiResponse;
import wbm.growther.growther_001.payload.AuthResponse;
import wbm.growther.growther_001.services.AuthenticationService;



@RestController
@RequestMapping("/authentication")
public class AuthenticationController {


    @Autowired
    private AuthenticationService authenticationService;


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody UserDto loginRequest ) {
        String token= authenticationService.authenticateUser(loginRequest);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserDto signUpRequest) {

        String token=authenticationService.registerUser(signUpRequest);
        return ResponseEntity.ok(new ApiResponse(true,
                        "User registered successfully token:" +
                " is  "+ token));
    }


    @GetMapping(path = "confirmEmail")
    public String confirmEmail(@RequestParam("token") String token){
        
        return authenticationService.confirm(token);
    }


}
