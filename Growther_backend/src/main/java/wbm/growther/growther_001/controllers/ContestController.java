package wbm.growther.growther_001.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import wbm.growther.growther_001.dtos.ContestDto;
import wbm.growther.growther_001.exceptions.ResourceNotFoundException;
import wbm.growther.growther_001.services.ContestService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@RestController
@RequestMapping("api/contests")
public class ContestController {
    @Autowired
    private ContestService contestService;

    //Get All Contests
    @GetMapping("/GetContests")
    public List<ContestDto> getContests(){
        return contestService.getAllContests();
    }

    //Get contest by id
    @GetMapping("/{id}")
    public ResponseEntity<ContestDto> getContestById(@PathVariable(value = "id") Long contestId) throws ResourceNotFoundException {
        ContestDto contestDto = contestService.getContestById(contestId);
        if(contestDto==null) throw new ResourceNotFoundException("No contest exist with ID : "+contestId.toString());
        return ResponseEntity.ok().body(contestDto);
    }

    //Create new contest
    @PostMapping("/create")
    public ContestDto createContest(@RequestBody ContestDto contestDto) throws RejectedExecutionException{
        Boolean contestCreated = contestService.createNewContest(contestDto);
        if(contestCreated) return contestDto;
        throw new RejectedExecutionException("A Contest with that ID already exist !!");
    }

    //Update contest
    @PutMapping("/update/{id}")
    public ResponseEntity<ContestDto> updateContest(@PathVariable(value = "id") Long contestId
            ,@Validated @RequestBody ContestDto contestDetails) throws ResourceNotFoundException {
        ContestDto contestDto=contestService.getContestById(contestId);

        // if the contest does not exist, throw an exception
        if(contestDto==null) throw new ResourceNotFoundException("No Contest exist with  ID : "+contestId.toString());

        //update informations

        contestDto.setTitle(contestDetails.getTitle());
        contestDto.setDescription(contestDetails.getDescription());
        contestDto.setEndDate(contestDetails.getEndDate());
        contestDto.setMaxReach(contestDetails.getMaxReach());
        contestDto.setPrizes(contestDetails.getPrizes());
        contestDto.setDuration(contestDetails.getDuration());

        ContestDto contestDtoUpdated=contestService.updateContestInfos(contestDetails);
        return  ResponseEntity.ok().body(contestDtoUpdated);
    }

    //Delete contest
    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteContest(@PathVariable(value = "id") Long contestId)
            throws ResourceNotFoundException {
        ContestDto contestDto = contestService.getContestById(contestId);
        if (contestDto==null) throw new ResourceNotFoundException("Contest not found for this id : "+contestId);

        contestService.deleteContest(contestDto);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Contest Deleted successfully",Boolean.TRUE);
        return  response;
    }
}