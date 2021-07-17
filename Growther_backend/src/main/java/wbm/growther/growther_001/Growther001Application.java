package wbm.growther.growther_001;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class Growther001Application  {

    public static void main(String[] args) {
        SpringApplication.run(Growther001Application.class, args);
    }


    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }


}
