package wbm.growther.growther_001.services.ServicesImplementation;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wbm.growther.growther_001.dtos.UserDto;
import wbm.growther.growther_001.models.users.User;
import wbm.growther.growther_001.repository.UserRepository;
import wbm.growther.growther_001.services.UserService;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

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
    public UserDto updateUserInfos(UserDto userDto) {
        User user = mapToUser(userDto);

        // TODO : verify the email using the jwt token before update
        userRepository.save(user);
        return userDto;
    }

    @Override
    public void deleteUser(UserDto userDto) {
        User user=mapToUser(userDto);
        // TODO : verify the email using the jwt token before delete

        userRepository.delete(user);
    }

    @Override
    public UserDto getUserByName(String userName) {
       User user = userRepository.findUserByName(userName);
       return mapToDto(user);
    }

    private UserDto mapToDto(User user){
        UserDto userDto=modelMapper.map(user,UserDto.class);
        return userDto;
    }

    //convert Dto to model
    private User mapToUser(UserDto userDto){
        User user=modelMapper.map(userDto,User.class);
        return user;
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

}
