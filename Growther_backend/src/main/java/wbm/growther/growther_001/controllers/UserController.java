package wbm.growther.growther_001.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import wbm.growther.growther_001.dtos.UserDto;
import wbm.growther.growther_001.exceptions.ResourceNotFoundException;
import wbm.growther.growther_001.models.users.User;
import wbm.growther.growther_001.payload.UpdatePassword;
import wbm.growther.growther_001.security.SecurityModel.SecurityUser;
import wbm.growther.growther_001.services.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
            throw new ResourceNotFoundException("No brand exist with ID : "+userId.toString());
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
    public ResponseEntity<UserDto> updateUser(@PathVariable (value = "id") Long userId,
                                                @Validated @RequestBody UserDto userInfos) throws
            ResourceNotFoundException{

        System.out.println(userId);
        System.out.println(userInfos.getActivities());

        UserDto userDto=userService.getUserById(userId);

        // if the user does not exist, throw an exception
        if(userDto==null)
            throw new ResourceNotFoundException("No user exist with  ID : "+userId.toString());

        //update informations
        if(userInfos.getEmail() != null)
        userDto.setEmail(userInfos.getEmail());
        if(userInfos.getName() != null)
        userDto.setName(userInfos.getName());

        userDto.setIsBrand(userInfos.getIsBrand());
        if( userDto.getIsBrand()!= null && userDto.getIsBrand().equalsIgnoreCase("true"))
        {
            userDto.setUrl(userInfos.getUrl());
            userDto.setActivities(userInfos.getActivities());
        }

        UserDto userDtoUpdated=userService.updateUserInfos(userDto);
        System.out.println(userDtoUpdated.getActivities());
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
    public Map<String , Boolean> deleteUser(@PathVariable(value = "id")Long userId)
            throws ResourceNotFoundException{

        UserDto userDto=userService.getUserById(userId);
        if(userDto==null)
            throw new ResourceNotFoundException("No user exist with  ID : "+userId);

        userService.deleteUser(userDto);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Brand Deleted successfully",Boolean.TRUE);
        return  response;
    }

}
