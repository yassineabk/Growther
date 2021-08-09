package wbm.growther.growther_001.services.ServicesImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wbm.growther.growther_001.dtos.ParticipationDto;
import wbm.growther.growther_001.models.Contest;
import wbm.growther.growther_001.models.Participation;
import wbm.growther.growther_001.models.ParticipationAction;
import wbm.growther.growther_001.models.users.User;
import wbm.growther.growther_001.repository.ContestRepository;
import wbm.growther.growther_001.repository.ParticipationActionRepository;
import wbm.growther.growther_001.repository.ParticipationRepository;
import wbm.growther.growther_001.repository.UserRepository;
import wbm.growther.growther_001.services.ParticipationService;

import java.util.ArrayList;
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
    @Override
    public List<ParticipationDto> getAllParticipations() {
        List<Participation> participations = repository.findAll();
        return getParticipationsDto(participations);
    }

    @Override
    public Participation createNewParticipation(ParticipationDto participationDto,String email,Long contestID) {
        User user = userRepository.findUserByEmail(email);
        if(!user.getIsBrand().equalsIgnoreCase("false")) Long.decode("0");

        Contest contest = contestRepository.findContestByIdContest(contestID);
        if(contest==null) System.out.println("No contest with ID: "+contestID);
        else System.out.println("contest with ID: "+contest.getIdContest());

        Participation participation = toParticipation(participationDto);


        Set<ParticipationAction> actions = participation.getParticipationActions();
        actions.forEach( action -> {
            action.setParticipation(participation);
        });

        participation.setUser(user);
        participation.setContest(contest);

        repository.save(participation);

        actions.forEach( action -> {
            actionRepository.save(action);
        });

        return participation;
    }

    @Override
    public ParticipationDto getParticipationById(Long participationID) {
        Participation participation = repository.findParticipationById(participationID);
        return (participation==null)? null :  toDto(participation);
    }

    @Override
    public ParticipationDto updateParticipation(ParticipationDto participationDto) {
        Participation participation = toParticipation(participationDto);
        repository.save(participation);
        return toDto(repository.save(participation));
    }

    @Override
    public void deleteParticipation(ParticipationDto participationDto) {
        Participation participation = toParticipation(participationDto);
        repository.delete(participation);
    }
    //convert Dto to model
    private Participation toParticipation(ParticipationDto participationDto){
        Participation participation = new Participation();
        participation.setId(participationDto.getId());
        participation.setPartipationDate(participationDto.getPartipationDate());
        participation.setContest(participationDto.getContest());
        participation.setUser(participationDto.getUser());
        participation.setParticipationActions(participationDto.getParticipationActions());
        participation.setTotalPoints(participationDto.getTotalPoints());
        participation.setDone(participationDto.isDone());
        return participation;
    }
    //convert model to DTO
    private ParticipationDto toDto(Participation participation){
        ParticipationDto participationDto = new ParticipationDto();
        participationDto.setId(participation.getId());
        participationDto.setPartipationDate(participation.getPartipationDate());
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
