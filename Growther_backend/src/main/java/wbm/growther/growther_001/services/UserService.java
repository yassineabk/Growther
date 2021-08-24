package wbm.growther.growther_001.services;

import wbm.growther.growther_001.dtos.UserDto;
import wbm.growther.growther_001.exceptions.ResourceNotFoundException;

import java.util.List;

public interface UserService {

    List<UserDto> getAllUsers();
    UserDto getUserById(Long brandID);
    UserDto getUserByEmail(String brandEmail);
    UserDto updateUserInfos(UserDto userDto,Long userId) throws ResourceNotFoundException;
    void deleteUser(Long userId) throws ResourceNotFoundException;
    String updateUserPassword(String oldPassword,String newPassword);


}
