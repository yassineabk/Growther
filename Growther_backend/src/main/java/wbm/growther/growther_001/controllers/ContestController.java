package wbm.growther.growther_001.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import wbm.growther.growther_001.dtos.ContestDto;
import wbm.growther.growther_001.exceptions.ResourceNotFoundException;
import wbm.growther.growther_001.security.SecurityModel.SecurityUser;
import wbm.growther.growther_001.services.ContestService;
import wbm.growther.growther_001.utils.JwtUtils;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
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
        if(contestDto==null)
            throw new ResourceNotFoundException("No contest exist with ID : "+contestId.toString());

        return ResponseEntity.ok().body(contestDto);

    }
    //Get contest by id
    @GetMapping("/{id}/user")
    public ResponseEntity<String> getUserContestById(@PathVariable(value = "id") Long contestId)
            throws ResourceNotFoundException {

        ContestDto contestDto = contestService.getContestById(contestId);
        if(contestDto==null) throw new ResourceNotFoundException("No contest exist with ID : "+contestId.toString());
        return ResponseEntity.ok().body(contestDto.getUser().getEmail());
    }

    //Get contest by id and infos
    @GetMapping("/{title}/{id}")
    public ResponseEntity<ContestDto> getContestByInfos(@PathVariable(value = "id") Long contestId,
                                                        @PathVariable(value = "title") String contestTitle)
            throws ResourceNotFoundException {
        ContestDto contestDto = contestService.getContestByInfos(contestTitle,contestId);
        if(contestDto==null)
            throw new ResourceNotFoundException("No contest exist with ID : "+contestId.toString());

        // load the principal (authenticated user)
        SecurityUser principal= (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();
        //get the user id from security context
        Long userId=principal.getId();

        //get the id of the brand who created that contest
        Long brandId=contestDto.getUser().getId();

        if( contestDto.getStatus().equalsIgnoreCase("Published")
                || userId==brandId)
            return ResponseEntity.ok().body(contestDto);
        else return ResponseEntity.status(403).body(null);
    }

    @PostMapping("/create")
    public Long createContest(@RequestBody ContestDto contestDto
            ,HttpServletRequest request) throws RejectedExecutionException{

        // load the principal (authenticated user)
        SecurityUser principal= (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();

        //get the email from the principal
        String email= principal.getEmail();


        Long contestCreated = contestService.createNewContest(contestDto,email);
        if(contestCreated != Long.decode("0")) return contestCreated;
        System.out.println(contestCreated);
        throw new RejectedExecutionException("A Contest with that ID already exist !!");
    }

    @PostMapping("/create/draft")
    public Long createDraftContest(@RequestBody ContestDto contestDto
            ,HttpServletRequest request) throws RejectedExecutionException{

        // load the principal (authenticated user)
        SecurityUser principal= (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();

        //get the email from the principal
        String email= principal.getEmail();

        Long contestCreated = contestService.createNewDraftContest(contestDto,email);
        if(contestCreated != Long.decode("0")) return contestCreated;
        System.out.println(contestCreated);
        throw new RejectedExecutionException("A Contest with that ID already exist !!");
    }

    @GetMapping("/draft/{id}")
    public Long draftContest(@PathVariable(value = "id") Long contestID)
            throws RejectedExecutionException{


        ContestDto contestCreated = contestService.draftContest(contestID);
        if(contestCreated != null) return contestCreated.getIdContest();
        throw new RejectedExecutionException("NO DRAFT");
    }


    //Update contest
    @PutMapping("/update/{id}")
    public ResponseEntity<ContestDto> updateContest(@PathVariable(value = "id") Long contestId
            ,@Validated @RequestBody ContestDto contestDetails) throws ResourceNotFoundException {
        ContestDto contestDto=contestService.getContestById(contestId);

        // if the contest does not exist, throw an exception
        if(contestDto==null) throw new ResourceNotFoundException("No Contest exist with  ID : "+contestId.toString());
        System.out.println(contestId.toString());
        //update informations


        contestDto.setTitle(contestDetails.getTitle());
        contestDto.setDescription(contestDetails.getDescription());
        contestDto.setEndDate(contestDetails.getEndDate());
        contestDto.setActionsNbr(contestDetails.getActionsNbr());
        contestDto.setWinnersNbr(contestDetails.getWinnersNbr());
        contestDto.setMaxReach(contestDetails.getMaxReach());
        contestDto.setPrizes(contestDetails.getPrizes());
        contestDto.setDuration(contestDetails.getDuration());
        contestDto.setStatus(contestDetails.getStatus());

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
