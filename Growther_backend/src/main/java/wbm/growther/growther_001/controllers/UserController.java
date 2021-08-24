package wbm.growther.growther_001.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import wbm.growther.growther_001.dtos.UserDto;
import wbm.growther.growther_001.exceptions.ResourceNotFoundException;
import wbm.growther.growther_001.payload.UpdatePassword;
import wbm.growther.growther_001.security.SecurityModel.SecurityUser;
import wbm.growther.growther_001.services.UserService;

import java.util.List;


@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/Getusers")
    public List<UserDto> getUsers(){
        return userService.getAllUsers();
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable(value = "id") Long userId)
            throws ResourceNotFoundException {

        UserDto userDto = userService.getUserById(userId);
        if(userDto==null)
            throw new ResourceNotFoundException("No User exist with ID : "+userId.toString());
        return ResponseEntity.ok().body(userDto);
    }


    @GetMapping("/email/{email}")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable(value = "email") String userEmail)
            throws ResourceNotFoundException{
        UserDto userDto = userService.getUserByEmail(userEmail);
        if(userDto==null)
            throw new ResourceNotFoundException("No user exist with email: "+userEmail);

        return ResponseEntity.ok().body(userDto);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable (value = "id") Long userId,
                                                @Validated @RequestBody UserDto userInfos) throws
            ResourceNotFoundException{

        SecurityUser securityUser= (SecurityUser)
                SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long authenticatedUserId= securityUser.getId();

        if(!authenticatedUserId.equals(userId))
            ResponseEntity.status(403).body("You are not allowed to see or update those " +
                    "informations");

        UserDto userDtoUpdated=userService.updateUserInfos(userInfos,userId);

        return  ResponseEntity.ok().body(userDtoUpdated);
    }

    @PutMapping("/update/password")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePassword obj){

        String response=userService
                .updateUserPassword(obj.getOldPassword(),obj.getNewPassword());

        if(response.equalsIgnoreCase("password updated"))
            return ResponseEntity.ok(response);

        return ResponseEntity.status(403).body(response);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable(value = "id")Long userId)
            throws ResourceNotFoundException{

        SecurityUser securityUser= (SecurityUser)
                SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Long authenticatedUserId= securityUser.getId();

        if(!authenticatedUserId.equals(userId))
            ResponseEntity.status(403).body("You are not allowed to see or update those " +
                    "informations");

        userService.deleteUser(userId);
        return  ResponseEntity.ok().body("Brand Deleted successfully");
    }

}
