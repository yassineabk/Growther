package wbm.growther.growther_001.services.ServicesImplementation;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wbm.growther.growther_001.UpdateContestStateJob;
import wbm.growther.growther_001.models.Participation;
import wbm.growther.growther_001.threadPoolTaskSchedulerClass;
import wbm.growther.growther_001.dtos.ContestDto;
import wbm.growther.growther_001.models.Contest;
import wbm.growther.growther_001.models.Prize;
import wbm.growther.growther_001.models.actions.Action;
import wbm.growther.growther_001.models.users.User;
import wbm.growther.growther_001.repository.*;
import wbm.growther.growther_001.services.ContestService;

import javax.persistence.EntityManager;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ContestServiceImpl implements ContestService {

    @Autowired
    private ContestRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ParticipationRepository participationRepository;

    @Autowired
    private PrizeRepository prizeRepository;

    @Autowired
    private ActionRepository actionRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private threadPoolTaskSchedulerClass taskScheduler;


    @Override
    public List<ContestDto> getAllContests() {
        List<Contest> contests = repository.findAll();
        return getContestsDto(contests);
    }

    @Override
    public Long createNewContest(ContestDto NewContestDto, String email) throws ParseException {

        User user = userRepository.findUserByEmail(email);
        if(!user.getIsBrand().equalsIgnoreCase("true")) Long.decode("0");


        Contest contest = toContest(NewContestDto);
        //check if a contest with the same id exist
        Contest contestExist = repository.findContestByIdContest(contest.getIdContest());

        if(contestExist!=null) return Long.decode("0");

        contest.setStatus("in_Creation");
        contest.setUser(user);

        Set<Prize> prizes = contest.getPrizes();
        Set<Action> actions = contest.getActions();

        actions.forEach( action -> {
            action.setContest(contest);
        });

        prizes.forEach( prize -> {
            prize.setContest(contest);
        });

        repository.save(contest);

        prizes.forEach( prize -> {
            prizeRepository.save(prize);
        });
        actions.forEach( action -> {
            actionRepository.save(action);
        });


        System.out.println(contest.getStartDate());
        System.out.println(contest.getEndDate());



        UpdateContestStateJob publishContestJob=new UpdateContestStateJob(
                contest.getIdContest(),
                "Published",
                contest.getStartDate(),
                repository
        );

        UpdateContestStateJob endContestJob=new UpdateContestStateJob(
                contest.getIdContest(),
                "Done",
                contest.getEndDate(),
                repository
        );

       /* UpdateContestStateJob testContestJob=new UpdateContestStateJob(
                contest.getIdContest(),
                "beggybone",
               dd,
                repository
        );*/



        taskScheduler.doTask(publishContestJob);
        taskScheduler.doTask(endContestJob);

         //this one if you wanna test
        //taskScheduler.doTask(testContestJob);

        return contest.getIdContest();
    }

    @Override
    public Long createNewDraftContest(ContestDto NewContestDto, String email) throws ParseException {

        User user = userRepository.findUserByEmail(email);
        if(!user.getIsBrand().equalsIgnoreCase("true")) Long.decode("0");


        Contest contest = toContest(NewContestDto);
        //check if a contest with the same id exist
        Contest contestExist = repository.findContestByIdContest(contest.getIdContest());

        if(contestExist!=null) return Long.decode("0");

        contest.setStatus("DRAFT");
        contest.setUser(user);

        Set<Prize> prizes = contest.getPrizes();
        Set<Action> actions = contest.getActions();

        actions.forEach( action -> {
            action.setContest(contest);
        });

        prizes.forEach( prize -> {
            prize.setContest(contest);
        });

        repository.save(contest);

        prizes.forEach( prize -> {
            prizeRepository.save(prize);
        });
        actions.forEach( action -> {
            actionRepository.save(action);
        });

        System.out.println(contest.getIdContest());


        return contest.getIdContest();
    }

    @Override
    public ContestDto draftContest(Long contestID) {

        Contest contestExist = repository.findContestByIdContest(contestID);
        Contest contest = new Contest(contestExist);

        Set<Prize> prizes = contestExist.getPrizes();
        Set<Action> actions = contestExist.getActions();
        Set<Prize> newPrizes = new HashSet<>();
        Set<Action> newActions = new HashSet<>();

        actions.forEach( action -> {
            newActions.add(new Action(action));
            //action.setContest(contest);
        });
        newActions.forEach( action -> {
            action.setId(0L);
            action.setContest(contest);
        });


        prizes.forEach( prize -> {
            newPrizes.add(new Prize(prize));
            //prize.setContest(contest);
        });
        newPrizes.forEach( prize -> {
            prize.setId(0L);
            prize.setContest(contest);
        });

        contest.setIdContest(0);
        contest.setStatus("DRAFT");

        repository.save(contest);

        newPrizes.forEach( prize -> {
            prizeRepository.save(prize);
        });
        newActions.forEach( action -> {
            actionRepository.save(action);
        });
        return (contest==null)? null :  toDto(contest);
    }



    @Override
    public ContestDto getContestById(Long contestID) {
        Contest contest = repository.findContestByIdContest(contestID);
        return (contest==null)? null :  toDto(contest);
    }

    @Override
    public ContestDto updateContestInfos(ContestDto contestDto) throws ParseException {
        Contest contest=toContest(contestDto);
        repository.save(contest);
        return toDtoUpdate(repository.save(contest));
    }

    @Override
    public void deleteContest(ContestDto contestDto) throws ParseException {
        Contest contest=toContest(contestDto);
        repository.delete(contest);
    }

    @Override
    public ContestDto getContestByTitle(String title) {
        Contest contest = repository.findContestByTitle(title);
        return (contest==null)? null :  toDto(contest);
    }

    @Override
    public ContestDto getContestByInfos(String title, Long id,String timezone) {
        Contest contest = repository.findContestByTitleAndIdContest(title,id);
        return (contest==null)? null :  getZonedtimeContestDto(contest,timezone);
    }

    @Override
    public ContestDto getLastContest() {
        Contest contest = repository.findTopByOrderByIdContestDesc();
        return (contest==null)? null :  toDto(contest);
    }

    @Override
    public ContestDto publishContest(Long contestID) {
        Contest contest = repository.findContestByIdContest(contestID);
        contest.setStatus("Published");
        repository.save(contest);
        return (contest==null)? null :  toDto(contest);
    }


    //convert model to DTO
    private ContestDto mapToDto(Contest contest){
        ContestDto contestDto = modelMapper.map(contest,ContestDto.class);
        return contestDto;
    }

    public ContestDto toDto(Contest contest){
        ContestDto contestDto = new ContestDto();
        contestDto.setIdContest(contest.getIdContest());
        contestDto.setTitle(contest.getTitle());
        contestDto.setStatus(contest.getStatus());
        contestDto.setUser(contest.getUser());
        contestDto.setDescription(contest.getDescription());
        contestDto.setWinnersNbr(contest.getWinnersNbr());
        contestDto.setActionsNbr(contest.getActionsNbr());
       // contestDto.setStartDate(contest.getStartDate());
        //contestDto.setEndDate(contest.getEndDate());

        // TODO: set date in user TimeZone
        contestDto.setDateInUserTimezone(
                contest.getStartDate(),contest.getEndDate(),TimeZone.getDefault().toString()
        );
        contestDto.setStartTime(contest.getStartTime());
        contestDto.setEndTime(contest.getEndTime());
        contestDto.setTimeZone(contest.getTimeZone());
        contestDto.setImmediately(contest.getImmediately());
        contestDto.setMaxReach(contest.getMaxReach());
        contestDto.setActions(contest.getActions());
        contestDto.setPrizes(contest.getPrizes());
        contestDto.setNumOfParticipation(this.GetNumOfParticipation(contest.getIdContest()));
        return contestDto;
    }
    public ContestDto toDtoUpdate(Contest contest){
        ContestDto contestDto = new ContestDto();
        contestDto.setIdContest(contest.getIdContest());
        contestDto.setTitle(contest.getTitle());
        contestDto.setStatus(contest.getStatus());
        contestDto.setUser(contest.getUser());
        contestDto.setDescription(contest.getDescription());
        contestDto.setWinnersNbr(contest.getWinnersNbr());
        contestDto.setActionsNbr(contest.getActionsNbr());
        // contestDto.setStartDate(contest.getStartDate());
        //contestDto.setEndDate(contest.getEndDate());

        // TODO: set date in user TimeZone
        contestDto.setDateInUserTimezone(
                contest.getStartDate(),contest.getEndDate(),TimeZone.getDefault().toString()
        );
        contestDto.setStartTime(contest.getStartTime());
        contestDto.setEndTime(contest.getEndTime());
        contestDto.setTimeZone(contest.getTimeZone());
        contestDto.setImmediately(contest.getImmediately());
        contestDto.setMaxReach(contest.getMaxReach());
        //contestDto.setActions(contest.getActions());
        //contestDto.setPrizes(contest.getPrizes());
        contestDto.setNumOfParticipation(this.GetNumOfParticipation(contest.getIdContest()));
        return contestDto;
    }

    //convert Dto to model
    private Contest mapToContest(ContestDto contestDto){
        Contest contest = modelMapper.map(contestDto,Contest.class);
        return contest;
    }

    public Contest toContest(ContestDto contestDto) throws ParseException {

        Contest contest = new Contest();
        contest.setIdContest(contestDto.getIdContest());
        contest.setTitle(contestDto.getTitle());
        contest.setDescription(contestDto.getDescription());
        contest.setStatus(contestDto.getStatus());
        contest.setUser(contestDto.getUser());
        contest.setWinnersNbr(contestDto.getWinnersNbr());
        contest.setActionsNbr(contestDto.getActionsNbr());
        contest.setStartDate(contestDto.getDateInServerTimezone(
                TimeZone.getDefault().toString(),
                contestDto.convertDate(contestDto.getStartDate())
        ));
        contest.setEndDate(contestDto.getDateInServerTimezone(
                TimeZone.getDefault().toString(),
                contestDto.convertDate(contestDto.getEndDate())
        ));
        contest.setStartTime(contestDto.getStartTime());
        contest.setEndTime(contestDto.getEndTime());
        contest.setTimeZone(contestDto.getTimeZone());
        contest.setImmediately(contestDto.getImmediately());
        contest.setMaxReach(contestDto.getMaxReach());
        contest.setActions(contestDto.getActions());
        contest.setPrizes(contestDto.getPrizes());
        return contest;
    }
    // returns a list of contests DTO
    private List<ContestDto> getContestsDto(List<Contest> contests){
        List<ContestDto> contestDtos = new ArrayList<>();

        contests.forEach( contest -> {
            ContestDto contestDto= toDto(contest);
            contestDtos.add(contestDto);
        });
        return contestDtos;
    }

    public ContestDto getZonedtimeContestDto(Contest contest,String timezone){
        ContestDto contestDto = new ContestDto();
        contestDto.setIdContest(contest.getIdContest());
        contestDto.setTitle(contest.getTitle());
        contestDto.setStatus(contest.getStatus());
        contestDto.setUser(contest.getUser());
        contestDto.setDescription(contest.getDescription());
        contestDto.setWinnersNbr(contest.getWinnersNbr());
        contestDto.setActionsNbr(contest.getActionsNbr());
        // contestDto.setStartDate(contest.getStartDate());
        //contestDto.setEndDate(contest.getEndDate());

        // TODO: set date in user TimeZone
        contestDto.setDateInUserTimezone(
                contest.getStartDate(),contest.getEndDate(),TimeZone.getDefault().toString()
        );
        contestDto.setStartTime(contest.getStartTime());
        contestDto.setEndTime(contest.getEndTime());
        contestDto.setTimeZone(contest.getTimeZone());
        contestDto.setImmediately(contest.getImmediately());
        contestDto.setMaxReach(contest.getMaxReach());
        contestDto.setActions(contest.getActions());
        contestDto.setPrizes(contest.getPrizes());
        contestDto.setNumOfParticipation(this.GetNumOfParticipation(contest.getIdContest()));
        return contestDto;
    }


    private int GetNumOfParticipation(Long idContest){
        List<Participation> participations=participationRepository
                .findAllByContestIdContest(idContest);
        return participations.size();
    }

}
