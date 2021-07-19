package wbm.growther.growther_001.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wbm.growther.growther_001.models.users.User;
import wbm.growther.growther_001.repository.UserRepository;
import wbm.growther.growther_001.security.AuthenticationProvider;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;

    public void processOAuthPostLogin(String username, String email, String provider) {
        User existUser = repo.findByEmail(email);

        if (existUser == null) {
            User newUser = new User();
            newUser.setName(username);
            newUser.setEmail(email);
            newUser.setAuthProvider(provider.toUpperCase());
            repo.save(newUser);

            System.out.println("Created new user: " + newUser.getName());
        }

    }

    public void createNewUserAfterOAuthLogin(String email, String name, String provider) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setAuthProvider(provider);
        repo.save(user);

    }

    public void updateUserAfterOAuthLogin(User user, String name, String provider) {
        user.setName(name);
        user.setAuthProvider(provider);
        repo.save(user);
    }
}
