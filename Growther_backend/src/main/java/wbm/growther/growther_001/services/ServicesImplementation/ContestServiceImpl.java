package wbm.growther.growther_001.services.ServicesImplementation;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wbm.growther.growther_001.dtos.ContestDto;
import wbm.growther.growther_001.models.Contest;
import wbm.growther.growther_001.models.users.User;
import wbm.growther.growther_001.repository.ContestRepository;
import wbm.growther.growther_001.repository.UserRepository;
import wbm.growther.growther_001.services.ContestService;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContestServiceImpl implements ContestService {

    @Autowired
    private ContestRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public List<ContestDto> getAllContests() {
        List<Contest> contests = repository.findAll();
        return getContestsDto(contests);
    }

    @Override
    public Long createNewContest(ContestDto NewContestDto, String email) {

        User user = userRepository.findUserByEmail(email);
        if(!user.getIsBrand().equalsIgnoreCase("true")) Long.decode("0");


        Contest contest = toContest(NewContestDto);
        //check if a contest with the same id exist
        Contest contestExist = repository.findContestByIdContest(contest.getIdContest());

        if(contestExist!=null) return Long.decode("0");

        contest.setStatus("in_Creation");
        contest.setUser(user);
        repository.save(contest);
        System.out.println(contest.getIdContest());
        return contest.getIdContest();
    }

    @Override
    public ContestDto getContestById(Long contestID) {
        Contest contest = repository.findContestByIdContest(contestID);
        return (contest==null)? null :  toDto(contest);
    }

    @Override
    public ContestDto updateContestInfos(ContestDto contestDto) {
        Contest contest=toContest(contestDto);
        repository.save(contest);
        return mapToDto(repository.save(contest));
    }

    @Override
    public void deleteContest(ContestDto contestDto) {
        Contest contest=toContest(contestDto);
        repository.delete(contest);
    }

    @Override
    public ContestDto getContestByTitle(String title) {
        Contest contest = repository.findContestByTitle(title);
        return (contest==null)? null :  toDto(contest);
    }

    @Override
    public ContestDto getContestByInfos(String title, String description, Long id) {
        Contest contest = repository.findContestByTitleAndDescriptionAndIdContest(title,description,id);
        return (contest==null)? null :  toDto(contest);
    }

    @Override
    public ContestDto getLastContest() {
        Contest contest = repository.findTopByOrderByIdContestDesc();
        return (contest==null)? null :  toDto(contest);
    }

    //convert model to DTO
    private ContestDto mapToDto(Contest contest){
        ContestDto contestDto = modelMapper.map(contest,ContestDto.class);
        return contestDto;
    }

    private ContestDto toDto(Contest contest){
        ContestDto contestDto = new ContestDto();
        contestDto.setIdContest(contest.getIdContest());
        contestDto.setTitle(contest.getTitle());
        contestDto.setStatus(contest.getStatus());
        contestDto.setUser(contest.getUser());
        contestDto.setDescription(contest.getDescription());
        contestDto.setWinnersNbr(contest.getWinnersNbr());
        contestDto.setActionsNbr(contest.getActionsNbr());
        contestDto.setStartDate(contest.getStartDate());
        contestDto.setEndDate(contest.getEndDate());
        contestDto.setDuration(contest.getDuration());
        contestDto.setMaxReach(contest.getMaxReach());
        contestDto.setActions(contest.getActions());
        contestDto.setPrizes(contest.getPrizes());
        return contestDto;
    }

    //convert Dto to model
    private Contest mapToContest(ContestDto contestDto){
        Contest contest = modelMapper.map(contestDto,Contest.class);
        return contest;
    }

    private Contest toContest(ContestDto contestDto){
        Contest contest = new Contest();
        contest.setIdContest(contestDto.getIdContest());
        contest.setTitle(contestDto.getTitle());
        contest.setDescription(contestDto.getDescription());
        contest.setStatus(contestDto.getStatus());
        contest.setUser(contestDto.getUser());
        contest.setWinnersNbr(contestDto.getWinnersNbr());
        contest.setActionsNbr(contestDto.getActionsNbr());
        contest.setStartDate(contestDto.getStartDate());
        contest.setEndDate(contestDto.getEndDate());
        contest.setDuration(contestDto.getDuration());
        contest.setMaxReach(contestDto.getMaxReach());
        contest.setActions(contestDto.getActions());
        contest.setPrizes(contestDto.getPrizes());
        return contest;
    }
    // returns a list of brands DTO
    private List<ContestDto> getContestsDto(List<Contest> contests){
        List<ContestDto> contestDtos = new ArrayList<>();

        contests.forEach( contest -> {
            ContestDto contestDto= toDto(contest);
            contestDtos.add(contestDto);
        });
        return contestDtos;
    }
}
