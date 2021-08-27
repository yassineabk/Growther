package wbm.growther.growther_001.services.ServicesImplementation;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wbm.growther.growther_001.dtos.UserDto;
import wbm.growther.growther_001.exceptions.ResourceNotFoundException;
import wbm.growther.growther_001.models.users.User;
import wbm.growther.growther_001.repository.UserRepository;
import wbm.growther.growther_001.security.SecurityModel.SecurityUser;
import wbm.growther.growther_001.services.UserService;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public List<UserDto> getAllUsers() {
        List<User> users =userRepository.findAll();
        return getUserDtos(users);
    }

    @Override
    public UserDto getUserById(Long userID) {
        User user=userRepository.findUserById(userID);
        return (user == null )? null : mapToDto(user);
    }

    @Override
    public UserDto getUserByEmail(String userEmail) {
        User user =userRepository.findUserByEmail(userEmail);
        return (user == null )? null : mapToDto(user);
    }

    @Override
    @Transactional
    public UserDto updateUserInfos(UserDto userInfos,Long userId)
            throws ResourceNotFoundException {

        UserDto userDto=this.getUserById(userId);

        // if the user does not exist, throw an exception
        if(userDto==null)
            throw new ResourceNotFoundException("No user exist with  ID : "+userId.toString());

        //update informations
        // a user cannot update his email or his status as brand or a normal user
        //userDto.setIsBrand(userInfos.getIsBrand());
        if(userInfos.getName() != null)
            userDto.setName(userInfos.getName());
        if(userInfos.getIsBrand()!= null) userDto.setIsBrand(userInfos.getIsBrand());
        if( userDto.getIsBrand()!= null
                && userDto.getIsBrand().equalsIgnoreCase("true"))
        {   if(userInfos.getUrl() != null)
                userDto.setUrl(userInfos.getUrl());
            if(userInfos.getActivities() != null)
                userDto.setActivities(userInfos.getActivities());
        }

        User user = mapToUser(userDto);
        userRepository.save(user);
        return userDto;
    }

    @Override
    public void deleteUser(Long userId) throws ResourceNotFoundException {

        UserDto userDto=this.getUserById(userId);
        if(userDto==null)
            throw new ResourceNotFoundException("No user exist with  ID : "+userId);
        User user=mapToUser(userDto);
        userRepository.delete(user);
    }



    @Override
    @Transactional
    public String updateUserPassword(String oldPassword, String newPassword) {

        SecurityUser securityUser= (SecurityUser) SecurityContextHolder.
                getContext().getAuthentication().getPrincipal();

        Long userId= securityUser.getId();

        //UserDto user=this.getUserById(userId);
        User user=userRepository.findUserById(userId);

        boolean doesMatch= passwordEncoder.matches(oldPassword,user.getPassword());
        String hashedNewPassword=passwordEncoder.encode(newPassword);

        System.out.println(doesMatch);

        if(user.getPassword() == null)
            return "you cant change your password, " +
                    "cause you don't have one";

        if(!doesMatch)
            return "your password is incorrect";
        if(oldPassword.equals(newPassword))
            return "password updated";
        user.setPassword(hashedNewPassword);
        //userRepository.save(mapToUser(user));
        //User user1=mapToUser(user);
        userRepository.save(user);
        return "password updated";

    }

    private UserDto mapToDto(User user){
        return modelMapper.map(user,UserDto.class);
    }

    //convert Dto to model
    private User mapToUser(UserDto userDto){
        return modelMapper.map(userDto,User.class);
    }

    // returns a list of users DTO
    private List<UserDto> getUserDtos(List<User> users){
        List<UserDto> userDtos=new ArrayList<>();

        users.forEach( user -> {
            UserDto userDto= mapToDto(user);
            userDtos.add(userDto);
        });
        return userDtos;
    }

    public void enableUser(String email) {
        userRepository.enableAppUser(email);
    }

}
