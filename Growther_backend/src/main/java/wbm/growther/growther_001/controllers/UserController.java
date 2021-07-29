package wbm.growther.growther_001.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import wbm.growther.growther_001.dtos.UserDto;
import wbm.growther.growther_001.exceptions.ResourceNotFoundException;
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

    @GetMapping("/name/{name}")
    public ResponseEntity<UserDto> getUserByName(@PathVariable(value = "name") String userName)
            throws ResourceNotFoundException{

        UserDto userDto = userService.getUserByName(userName);
        if(userDto==null) throw new ResourceNotFoundException("No user exist with name: "+userName);
        return ResponseEntity.ok().body(userDto);
    }



    @PutMapping("/update/{id}")
    public ResponseEntity<UserDto> updateBrand(@PathVariable (value = "id") Long userId,
                                                @Validated @RequestBody UserDto userInfos) throws
            ResourceNotFoundException{

        UserDto userDto=userService.getUserById(userId);

        // if the user does not exist, throw an exception
        if(userDto==null)
            throw new ResourceNotFoundException("No user exist with  ID : "+userId.toString());

        //update informations
        userDto.setEmail(userInfos.getEmail());
        userDto.setName(userInfos.getName());

        if(userDto.getIsBrand().equalsIgnoreCase("true"))
        userDto.setUrl(userInfos.getUrl());

        UserDto userDtoUpdated=userService.updateUserInfos(userDto);
        return  ResponseEntity.ok().body(userDtoUpdated);
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
