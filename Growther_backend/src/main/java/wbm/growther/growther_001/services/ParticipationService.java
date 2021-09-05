package wbm.growther.growther_001.services;

import wbm.growther.growther_001.dtos.ParticipationDto;
import wbm.growther.growther_001.exceptions.ResourceNotFoundException;
import wbm.growther.growther_001.models.Participation;

import java.text.ParseException;
import java.util.List;

public interface ParticipationService {
    List<ParticipationDto> getAllParticipations();

    List<ParticipationDto> getParticipationsByContest(Long contestID) throws ResourceNotFoundException;

    List<ParticipationDto> getParticipationsByUser(Long userID) throws ResourceNotFoundException;

    Participation createNewParticipation(ParticipationDto participationDto, String email, Long contestID) throws ParseException;

    ParticipationDto getParticipationById(Long participationID);

    ParticipationDto getParticipationByContestIdAndUserId(Long contestID, Long userID,String timezone);

    ParticipationDto updateParticipation(ParticipationDto participationDto) throws ParseException;

    void checkParticipation(Participation participation);

    void deleteParticipation(ParticipationDto participationDto) throws ParseException;

    ParticipationDto toDto(Participation participation);
    ParticipationDto toDto(Participation participation,String timeZone);
}
