package wbm.growther.growther_001.services;

import wbm.growther.growther_001.dtos.ContestDto;

import java.util.List;

public interface ContestService {
    List<ContestDto> getAllContests();
    Long createNewContest(ContestDto contestDto, String email);
    ContestDto getContestById(Long contestID);
    ContestDto updateContestInfos(ContestDto contestDto);
    void deleteContest(ContestDto contestDto);
    ContestDto getContestByTitle(String title);
    ContestDto getContestByInfos(String title,Long id);
    ContestDto getLastContest();
}
