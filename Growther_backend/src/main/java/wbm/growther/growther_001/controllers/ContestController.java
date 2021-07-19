package wbm.growther.growther_001.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import wbm.growther.growther_001.exceptions.ResourceNotFoundException;
import wbm.growther.growther_001.models.Contest;
import wbm.growther.growther_001.repository.ContestRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/")
public class ContestController {
    @Autowired
    private ContestRepository repository;

    //Get All Users
    @GetMapping("contests")
    public List<Contest> getUsers(){
        return this.repository.findAll();
    }

    //Get user by id
    @GetMapping("contests/{id}")
    public ResponseEntity<Contest> getContestById(@PathVariable(value = "id") Long contestId) throws ResourceNotFoundException {
        Contest user = repository.findById(contestId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :"+contestId));
        return ResponseEntity.ok().body(user);
    }

    //Create user
    @PostMapping("contests")
    public Contest createContest(@RequestBody Contest contest){
        return this.repository.save(contest);
    }

    //Update user
    @PutMapping("contests/{id}")
    public ResponseEntity<Contest> updateContest(@PathVariable(value = "id") Long contestId,@Validated @RequestBody Contest contestDetails) throws ResourceNotFoundException {
        Contest contest = repository.findById(contestId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id : "+contestId));

        contest.setTitle(contestDetails.getTitle());
        contest.setDescription(contestDetails.getDescription());
        contest.setActions(contestDetails.getActions());
        contest.setActionsNbr(contestDetails.getActionsNbr());
        contest.setStartDate(contestDetails.getStartDate());
        contest.setEndDate(contestDetails.getEndDate());
        contest.setMaxReach(contestDetails.getMaxReach());
        contest.setPrizes(contestDetails.getPrizes());
        contest.setWinnersNbr(contestDetails.getWinnersNbr());
        contest.setDuration(contestDetails.getDuration());

        return ResponseEntity.ok(this.repository.save(contest));
    }

    //Delete user
    @DeleteMapping("contests/{id}")
    public Map<String, Boolean> deleteContest(@PathVariable(value = "id") Long contestId) throws ResourceNotFoundException {
        Contest contest = repository.findById(contestId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for this id : "+contestId));
        this.repository.delete(contest);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return response;
    }
}
