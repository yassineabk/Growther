package wbm.growther.growther_001.services;

import wbm.growther.growther_001.dtos.UserDto;

public interface AuthenticationService {

    String registerUser(UserDto user);

    String authenticateUser(UserDto user);

    String confirm(String token);


}
