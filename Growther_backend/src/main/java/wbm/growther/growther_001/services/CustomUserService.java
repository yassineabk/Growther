package wbm.growther.growther_001.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import wbm.growther.growther_001.models.users.CustomUserDetails;
import wbm.growther.growther_001.models.users.User;
import wbm.growther.growther_001.repository.UserRepository;

public class CustomUserService implements UserDetailsService {
    @Autowired
    private UserRepository repo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = repo.findByEmail(email);
        if(user == null)
            throw new UsernameNotFoundException("User not found !");
        return new CustomUserDetails(user);
    }
}
