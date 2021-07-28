package wbm.growther.growther_001.services;

import wbm.growther.growther_001.dtos.UserDto;

import java.util.List;

public interface UserService {

    List<UserDto> getAllUsers();
    UserDto getUserById(Long brandID);
    UserDto getUserByEmail(String brandEmail);
    UserDto updateUserInfos(UserDto brandDto);
    void deleteUser(UserDto brandDto);
    UserDto getUserByName(String brandName);


}
