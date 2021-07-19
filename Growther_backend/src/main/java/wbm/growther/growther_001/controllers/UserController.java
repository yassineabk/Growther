package wbm.growther.growther_001.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import wbm.growther.growther_001.exceptions.ResourceNotFoundException;
import wbm.growther.growther_001.models.users.User;
import wbm.growther.growther_001.repository.UserRepository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    //Get All Users
    @GetMapping("users")
    public List<User> getUsers(){
        return this.userRepository.findAll();
    }

    //Get user by id
    @GetMapping("users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable(value = "id") Long userId) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :"+userId));
        return ResponseEntity.ok().body(user);
    }
    //Get oauthUser
    @GetMapping("user")
    public ResponseEntity<User> getoauthUser(HttpServletRequest request, HttpServletResponse response) {
        User user = new User(request.getAttribute("name").toString(),request.getAttribute("email").toString(),null ,request.getAttribute("provider").toString());
        return ResponseEntity.ok().body(user);
    }

    //Create user
    @PostMapping("users")
    public User createUser(@RequestBody User user){
        return this.userRepository.save(user);
    }

    //Update user
    @PutMapping("users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") Long userId,@Validated @RequestBody User userDetails) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :"+userId));
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        return ResponseEntity.ok(this.userRepository.save(user));
    }

    //Delete user
    @DeleteMapping("users/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") Long userId) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :"+userId));
        this.userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return response;
    }
}
