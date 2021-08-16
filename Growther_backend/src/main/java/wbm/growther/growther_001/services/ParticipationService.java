package wbm.growther.growther_001.services;

import wbm.growther.growther_001.dtos.ParticipationDto;
import wbm.growther.growther_001.exceptions.ResourceNotFoundException;
import wbm.growther.growther_001.models.Participation;

import java.util.List;

public interface ParticipationService {
    List<ParticipationDto> getAllParticipations();
    List<ParticipationDto> getParticipationsByContest(Long contestID) throws ResourceNotFoundException;
    Participation createNewParticipation(ParticipationDto participationDto, String email, Long contestID);
    ParticipationDto getParticipationById(Long participationID);
    ParticipationDto getParticipationByContestIdAndUserId(Long contestID,Long userID);
    ParticipationDto updateParticipation(ParticipationDto participationDto);
    void checkParticipation(Participation participation);
    void deleteParticipation(ParticipationDto participationDto);
}
