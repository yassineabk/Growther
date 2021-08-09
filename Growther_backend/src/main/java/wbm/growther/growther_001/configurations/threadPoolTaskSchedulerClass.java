package wbm.growther.growther_001.configurations;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Component;
import wbm.growther.growther_001.UpdateContestStateJob;

import java.util.Date;

@Component
public class threadPoolTaskSchedulerClass {


    @Autowired
    private ThreadPoolTaskScheduler taskScheduler;

    public void doTask(UpdateContestStateJob runnable){

        Date date=runnable.getChangeDate();
        taskScheduler.schedule(runnable,date);
    }
}
