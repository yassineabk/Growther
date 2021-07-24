package wbm.growther.growther_001.services;

import wbm.growther.growther_001.dtos.ContestDto;

import java.util.List;

public interface ContestService {
    List<ContestDto> getAllContests();
    Boolean createNewContest(ContestDto contestDto);
    ContestDto getContestById(Long contestID);
    ContestDto updateContestInfos(ContestDto contestDto);
    void deleteContest(ContestDto contestDto);
    ContestDto getContestByTitle(String title);
}
