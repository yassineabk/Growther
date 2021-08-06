package wbm.growther.growther_001.services;

import wbm.growther.growther_001.dtos.ParticipationDto;

import java.util.List;

public interface ParticipationService {
    List<ParticipationDto> getAllParticipations();
    Long createNewParticipation(ParticipationDto participationDto,String email,Long contestID);
    ParticipationDto getParticipationById(Long participationID);
    ParticipationDto updateParticipation(ParticipationDto participationDto);
    void deleteParticipation(ParticipationDto participationDto);
}
