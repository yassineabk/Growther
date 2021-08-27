package wbm.growther.growther_001.services.ServicesImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import wbm.growther.growther_001.dtos.ContestDto;
import wbm.growther.growther_001.dtos.ParticipationDto;
import wbm.growther.growther_001.exceptions.ResourceNotFoundException;
import wbm.growther.growther_001.models.Contest;
import wbm.growther.growther_001.models.Participation;
import wbm.growther.growther_001.models.ParticipationAction;
import wbm.growther.growther_001.models.actions.Action;
import wbm.growther.growther_001.models.users.User;
import wbm.growther.growther_001.repository.ContestRepository;
import wbm.growther.growther_001.repository.ParticipationActionRepository;
import wbm.growther.growther_001.repository.ParticipationRepository;
import wbm.growther.growther_001.repository.UserRepository;
import wbm.growther.growther_001.security.SecurityModel.SecurityUser;
import wbm.growther.growther_001.services.ContestService;
import wbm.growther.growther_001.services.ParticipationService;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Service
public class ParticipationServiceImpl implements ParticipationService {

    @Autowired
    private ParticipationRepository repository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ContestRepository contestRepository;
    @Autowired
    private ParticipationActionRepository actionRepository;

    @Autowired
    private ContestServiceImpl contestService;

    @Override
    public List<ParticipationDto> getAllParticipations() {
        List<Participation> participations = repository.findAll();
        participations.forEach(participation -> {
            this.checkParticipation(participation);
        });
        return getParticipationsDto(participations);
    }

    @Override
    public List<ParticipationDto> getParticipationsByContest(Long contestID) throws ResourceNotFoundException {
        Contest contest = contestRepository.findContestByIdContest(contestID);
        if(contest==null)
            throw new ResourceNotFoundException("No contest exist with ID : "+contestID.toString());
        Long brandID = contest.getUser().getId();
        // load the principal (authenticated user)
        SecurityUser principal= (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        //get the user id from security context
        Long userId=principal.getId();

        List<Participation> participations = repository.findAllByContestIdContest(contestID);
        //return participations just for the Brand who created the Contest
        if (userId == brandID)
            return getParticipationsDto(participations);
        else return null;
    }

    @Override
    public List<ParticipationDto> getParticipationsByUser(Long userID) throws ResourceNotFoundException {
        // load the principal (authenticated user)
        SecurityUser principal= (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        //get the user id from security context
        Long userId=principal.getId();

        List<Participation> participations = repository.findAllByUserId(userID);
        //return participations just for the Brand who created the Contest
        if (!participations.isEmpty())
            return getParticipationsDto(participations);
        else return null;
    }

    @Override
    public Participation createNewParticipation(ParticipationDto participationDto,String email,Long contestID) throws ParseException {
        User user = userRepository.findUserByEmail(email);
        if(!user.getIsBrand().equalsIgnoreCase("false")) Long.decode("0");

        Contest contest = contestRepository.findContestByIdContest(contestID);
        if(contest==null) System.out.println("No contest with ID: "+contestID);
        else System.out.println("contest with ID: "+contest.getIdContest());
        Participation participation = toParticipation(participationDto);


        Set<ParticipationAction> actions = participation.getParticipationActions();
        Set<ParticipationAction> contestActions = new HashSet<>();
        Set<Action> actionsContest = contest.getActions();

        actionsContest.forEach(action -> {
            contestActions.add(new ParticipationAction(action.getProvider(),action.getType(),action.getUrl(),action.getPoints()));
            //System.out.println(action.getType()+"--"+action.getUrl()+"--"+action.getProvider());
        });

        contestActions.forEach(action -> {
            action.setId(0L);
            action.setParticipation(participation);
        });

        actions.forEach( action -> {
            action.setParticipation(participation);
            System.out.println(action.isDone());
        });

        //participation.setId(0L);
        participation.setUser(user);
        participation.setContest(contest);

        repository.save(participation);

        actions.forEach( action -> {
            actionRepository.save(action);
        });
        contestActions.forEach(action -> {
            actionsContest.forEach(action1 -> {
                if (action.getType().equalsIgnoreCase(action1.getType())
                        && action.getProvider().equalsIgnoreCase(action1.getProvider())
                        && action.getUrl().equalsIgnoreCase(action1.getUrl()))
                    actionRepository.delete(action);
                    //System.out.println(action.getType()+"--"+action.getUrl()+"--"+action.getProvider());
                else
                    actionRepository.save(action);
            });
        });

        return participation;
    }

    @Override
    public ParticipationDto getParticipationById(Long participationID) {
        Participation participation = repository.findParticipationById(participationID);
        return (participation==null)? null :  toDto(participation);
    }

    @Override
    public ParticipationDto getParticipationByContestIdAndUserId(Long contestID, Long userID) {
        Participation participation = repository.findParticipationByContestIdContestAndUserId(contestID,userID);
        return (participation==null)? null :  toDto(participation);
    }

    @Override
    public ParticipationDto updateParticipation(ParticipationDto participationDto) throws ParseException {
        Participation participation = toParticipation(participationDto);
        repository.save(participation);
        return toDto(repository.save(participation));
    }

    @Override
    public void checkParticipation(Participation participation) {

        int totalDoneActions=0;
        int totalParticipatinPoints=0;
        Set<ParticipationAction> actions = participation.getParticipationActions();


        for(ParticipationAction action:actions){
            if(action.isDone()) {
                totalParticipatinPoints++;
                totalDoneActions++;
            }
        }
        if (totalDoneActions == actions.size())
            participation.setDone(true);

        participation.setTotalPoints(totalParticipatinPoints);

            repository.save(participation);

            actions.forEach( action -> {
                actionRepository.save(action);
            });
        }

    @Override
    public void deleteParticipation(ParticipationDto participationDto) throws ParseException {
        Participation participation = toParticipation(participationDto);
        repository.delete(participation);
    }
    //convert Dto to model
    private Participation toParticipation(ParticipationDto participationDto) throws ParseException {
        Participation participation = new Participation();
        participation.setId(participationDto.getId());
        participation.setPartipationDate(participationDto.getPartipationDate());
        //participation.setContest(contestService.toContest(participationDto.getContestDto()));
        participation.setContest(participationDto.getContest());
        participation.setUser(participationDto.getUser());
        participation.setParticipationActions(participationDto.getParticipationActions());
        participation.setTotalPoints(participationDto.getTotalPoints());
        participation.setDone(participationDto.isDone());
        return participation;
    }
    //convert model to DTO
    public ParticipationDto toDto(Participation participation){
        ParticipationDto participationDto = new ParticipationDto();
        participationDto.setId(participation.getId());
        participationDto.setPartipationDate(participation.getPartipationDate());
        //participationDto.setContestDto(contestService.toDto(participation.getContest()));
        participationDto.setContest(participation.getContest());
        participationDto.setUser(participation.getUser());
        participationDto.setParticipationActions(participation.getParticipationActions());
        participationDto.setTotalPoints(participation.getTotalPoints());
        participationDto.setDone(participation.isDone());
        return participationDto;
    }

    // returns a list of participations DTO
    private List<ParticipationDto> getParticipationsDto(List<Participation> participations){
        List<ParticipationDto> participationDtos = new ArrayList<>();

        participations.forEach( participation -> {
            ParticipationDto participationDto = toDto(participation);
            participationDtos.add(participationDto);
        });
        return participationDtos;
    }


}
