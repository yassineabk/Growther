package wbm.growther.growther_001;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
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
//        this.userRepository.save(new User("ABK","abk@mail.com","azerty123"));
//        this.userRepository.save(new User("Tom","tom@mail.com","azerty123"));
//        this.userRepository.save(new User("Jhon","jhon@mail.com","azerty123"));
    }
}
