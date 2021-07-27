package wbm.growther.growther_001.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import wbm.growther.growther_001.models.users.Brand;
import wbm.growther.growther_001.models.users.User;
import wbm.growther.growther_001.repository.BrandRepository;
import wbm.growther.growther_001.repository.UserRepository;
import wbm.growther.growther_001.security.SecurityModel.SecurityUser;

@Service
public class CustomUserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findUserByEmail(email);
        if(user == null)
            throw new UsernameNotFoundException("User not found !");
        return SecurityUser.Create(user);
    }

    public UserDetails loadUserByUserId(Long userId) throws UsernameNotFoundException{

        User user= userRepository.findUserById(userId);
        if(user == null)
            throw new UsernameNotFoundException("User not found !!");
        return  SecurityUser.Create(user);
    }
}
