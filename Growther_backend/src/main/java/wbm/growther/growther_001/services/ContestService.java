package wbm.growther.growther_001.services;

import wbm.growther.growther_001.dtos.ContestDto;
import wbm.growther.growther_001.dtos.ParticipationDto;
import wbm.growther.growther_001.exceptions.ResourceNotFoundException;
import wbm.growther.growther_001.models.Prize;
import wbm.growther.growther_001.payload.WinnersResponse;

import java.text.ParseException;
import java.util.List;
import java.util.Set;

public interface ContestService {
    List<ContestDto> getAllContests();
    List<ContestDto> getAllContestsByUser(Long userID);
    Long createNewContest(ContestDto contestDto, String email) throws ParseException;
    ContestDto createNewDraftContest(ContestDto contestDto, String email) throws ParseException;
    ContestDto getContestById(Long contestID);
    ContestDto draftContest(Long contestID);
    ContestDto updateContestInfos(ContestDto contestDto) throws ParseException;

    ContestDto updateDraftContestInfos(ContestDto contestDto) throws ParseException;

    void deleteContest(ContestDto contestDto) throws ParseException;
    ContestDto getContestByTitle(String title);
    ContestDto getContestByInfos(String title,Long id,String timezone);
    ContestDto getLastContest();
    ContestDto publishDraftContest(Long contestID) throws ResourceNotFoundException;

    List<WinnersResponse> getContestWinners(List<ParticipationDto> participationDtos,
                                            Set<Prize> prizes, Long ContestId);
    List<WinnersResponse> showContestWinners(Long contestId);
}
