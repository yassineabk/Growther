package wbm.growther.growther_001.services;

import wbm.growther.growther_001.dtos.ContestDto;

import java.text.ParseException;
import java.util.List;

public interface ContestService {
    List<ContestDto> getAllContests();
    List<ContestDto> getAllContestsByUser(Long userID);
    Long createNewContest(ContestDto contestDto, String email) throws ParseException;
    Long createNewDraftContest(ContestDto contestDto, String email) throws ParseException;
    ContestDto getContestById(Long contestID);
    ContestDto draftContest(Long contestID);
    ContestDto updateContestInfos(ContestDto contestDto) throws ParseException;
    void deleteContest(ContestDto contestDto) throws ParseException;
    ContestDto getContestByTitle(String title);
    ContestDto getContestByInfos(String title,Long id,String timezone);
    ContestDto getLastContest();
    ContestDto publishContest(Long contestID);
}
