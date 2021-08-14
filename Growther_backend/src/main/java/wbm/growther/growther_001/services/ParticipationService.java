package wbm.growther.growther_001.services;

import wbm.growther.growther_001.dtos.ParticipationDto;
import wbm.growther.growther_001.models.Participation;

import java.util.List;

public interface ParticipationService {
    List<ParticipationDto> getAllParticipations();
    Participation createNewParticipation(ParticipationDto participationDto, String email, Long contestID);
    ParticipationDto getParticipationById(Long participationID);
    ParticipationDto updateParticipation(ParticipationDto participationDto);
    void checkParticipation(Participation participation);
    void deleteParticipation(ParticipationDto participationDto);
}
