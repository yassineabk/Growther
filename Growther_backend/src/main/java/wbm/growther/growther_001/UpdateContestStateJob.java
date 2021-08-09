package wbm.growther.growther_001;

import org.springframework.beans.factory.annotation.Autowired;
import wbm.growther.growther_001.models.Contest;
import wbm.growther.growther_001.repository.ContestRepository;

import java.util.Date;

public class UpdateContestStateJob implements Runnable {



        private String newState;
        private Date changeDate;
        private Long contestID;
        private ContestRepository contestRepository;



    public Date getChangeDate() {
            return changeDate;
        }

        public UpdateContestStateJob(Long contestID ,
                                     String newState,
                                     Date changeDate,
                                     ContestRepository contestRepository){
            this.newState=newState;
            this.changeDate=changeDate;
            this.contestID=contestID;
            this.contestRepository=contestRepository;
        }

        @Override
        public void run() {
            Contest contest= contestRepository.findContestByIdContest(contestID);
            System.out.println("update contest state works fine");
            if(contest == null )return;

            contest.setStatus(newState);
            contestRepository.save(contest);
        }

}
