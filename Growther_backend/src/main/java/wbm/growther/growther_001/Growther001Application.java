package wbm.growther.growther_001;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.annotation.EnableScheduling;
import wbm.growther.growther_001.configurations.appConfiguration;

import java.util.Date;
import java.util.concurrent.ScheduledFuture;


@SpringBootApplication
@EnableConfigurationProperties(appConfiguration.class)
public class Growther001Application  {

    public static void main(String[] args) {

        SpringApplication.run(Growther001Application.class, args);
    }


    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }




}
