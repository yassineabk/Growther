package wbm.growther.growther_001;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import wbm.growther.growther_001.repository.UserRepository;

@SpringBootApplication
public class Growther001Application implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(Growther001Application.class, args);
    }
    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
    }
}
