package wbm.growther.growther_001.configurations;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import wbm.growther.growther_001.threadPoolTaskSchedulerClass;

@Configuration
@ComponentScan(
        basePackages="wbm.growther.growther_001",
        basePackageClasses={threadPoolTaskSchedulerClass.class})
public class ThreadPoolTaskSchedulerConfig {

    @Bean
    public ThreadPoolTaskScheduler threadPoolTaskScheduler() {
        ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
        threadPoolTaskScheduler.setPoolSize(10);
        threadPoolTaskScheduler.setThreadNamePrefix("TaskScheduler");
        return threadPoolTaskScheduler;
    }


}
