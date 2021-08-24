package wbm.growther.growther_001.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import wbm.growther.growther_001.dtos.ContestDto;
import wbm.growther.growther_001.dtos.ParticipationDto;
import wbm.growther.growther_001.exceptions.ResourceNotFoundException;
import wbm.growther.growther_001.security.SecurityModel.SecurityUser;
import wbm.growther.growther_001.services.ContestService;
import wbm.growther.growther_001.services.ParticipationService;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@RestController
@RequestMapping("api/contests")
public class ContestController {

    @Autowired
    private ContestService contestService;
    @Autowired
    private ParticipationService participationService;

    //Get All Contests
    @GetMapping("/GetContests")
    public List<ContestDto> getContests(){
        return contestService.getAllContests();
    }
    //Get All Contests
    @GetMapping("/all")
    public List<? extends Object> getContestsByUser() throws ResourceNotFoundException {
        Long userId=null;
        SecurityUser principal;

        // load the principal (authenticated user) if he exist
        try {
            principal= (SecurityUser) SecurityContextHolder
                    .getContext().getAuthentication().getPrincipal();
            //get the user id from security context
            userId=principal.getId();

        }catch (Exception e){
            System.out.println("do nothing");
        }
        List<ContestDto> contests = contestService.getAllContestsByUser(userId);
        List<ParticipationDto> participations = participationService.getParticipationsByUser(userId);
//        if (!contests.isEmpty())
//            return contests;
//        else
//            return participationService.getParticipationsByUser(userId);
        if (! participations.isEmpty())
            return participations;
        else
            return contests;
    }

    //Get contest by id
    @GetMapping("/{id}")
    public ResponseEntity<ContestDto> getContestById(@PathVariable(value = "id") Long contestId)
            throws ResourceNotFoundException {

        ContestDto contestDto = contestService.getContestById(contestId);
        if(contestDto==null)
            throw new ResourceNotFoundException("No contest exist with ID : "
                    +contestId.toString());

        return ResponseEntity.ok().body(contestDto);

    }
    //Publish contest by id
    @GetMapping("/{id}/publish")
    public ResponseEntity<ContestDto> publishContestById(@PathVariable(value = "id") Long contestId)
            throws ResourceNotFoundException {

        ContestDto contestDto = contestService.publishContest(contestId);

        if(contestDto==null)
            throw new ResourceNotFoundException("No contest exist with ID : "+contestId.toString());

        return ResponseEntity.ok().body(contestDto);

    }

    //Get the user  who created a contest by the contest id
    // TODO : should be deleted ??
    @GetMapping("/{id}/user")
    public ResponseEntity<String> getUserContestById(@PathVariable(value = "id") Long contestId)
            throws ResourceNotFoundException {

        ContestDto contestDto = contestService.getContestById(contestId);
        if(contestDto==null)
            throw new ResourceNotFoundException("No contest exist with ID : "
                    +contestId.toString());

        return ResponseEntity.ok().body(contestDto.getUser().getEmail());
    }

    //Get contest by id and infos
    /*@GetMapping("/{title}/{id}")
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
    }*/

    //Get contest by id and infos
    @GetMapping("/{title}/{id}")
    public ResponseEntity<Object> getContestByInfos(@PathVariable(value = "id") Long contestId,
                      @PathVariable(value = "title") String contestTitle,
                                                    @RequestParam("timezone")String timezone)
            throws ResourceNotFoundException {

        Long userId=null;
        SecurityUser principal;

        // load the principal (authenticated user) if he exist

        try {
            principal= (SecurityUser) SecurityContextHolder
                    .getContext().getAuthentication().getPrincipal();
            //get the user id from security context
            userId=principal.getId();

        }catch (Exception e){
            System.out.println("do nothing");
        }

        // get the contest
        ContestDto contestDto = contestService
                .getContestByInfos(contestTitle,contestId,timezone);

        if(contestDto==null)
            throw new ResourceNotFoundException("No contest exist with ID : "
                    +contestId.toString());

        //get the id of the brand who created that contest
        long brandId=contestDto.getUser().getId();


        //Show the contest for the brand and the participation for the normal user

        if (userId!=null && userId==brandId)
            return ResponseEntity.ok().body(contestDto);
        else{
            //then we have a normal user
            if(contestDto.getStatus().equalsIgnoreCase("Published"))
            {
                ParticipationDto participationDto=participationService
                        .getParticipationByContestIdAndUserId(contestId,userId);
                if(participationDto == null )
                    return ResponseEntity.ok().body(contestDto);
                else  return ResponseEntity.ok().body(participationDto);
            }
            else return ResponseEntity.
                    status(403).
                    body("You are not allowed to see this contest right now. COME BACK SOON !");
        }
    }

    @PostMapping("/create")
    public Long createContest(@RequestBody ContestDto contestDto)
            throws RejectedExecutionException, ParseException {

        // load the principal (authenticated user)
        SecurityUser principal= (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();

        //get the email from the principal
        String email= principal.getEmail();


        Long contestCreated = contestService.createNewContest(contestDto,email);
        if(!contestCreated.equals(Long.decode("0"))) return contestCreated;
        //TODO : delete println
        System.out.println(contestCreated);
        throw new RejectedExecutionException("A Contest with that ID already exist !!");
    }

    @PostMapping("/create/draft")
    public Long createDraftContest(@RequestBody ContestDto contestDto)
            throws RejectedExecutionException, ParseException {

        // load the principal (authenticated user)
        SecurityUser principal= (SecurityUser) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal();

        //get the email from the principal
        String email= principal.getEmail();

        Long contestCreated = contestService.createNewDraftContest(contestDto,email);
        if(!contestCreated.equals(Long.decode("0"))) return contestCreated;
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
            ,@Validated @RequestBody ContestDto contestDetails) throws ResourceNotFoundException, ParseException {
        ContestDto contestDto=contestService.getContestById(contestId);

        // if the contest does not exist, throw an exception
        if(contestDto==null) throw new ResourceNotFoundException("No Contest exist with  ID : "+contestId.toString());
        System.out.println(contestId.toString());
        //update informations


        if(contestDetails.getTitle() != null)
            contestDto.setTitle(contestDetails.getTitle());
        if(contestDetails.getDescription() != null)
            contestDto.setDescription(contestDetails.getDescription());
        if(contestDetails.getEndDate() != null)
            contestDto.setEndDate(contestDetails.getEndDate());
        if(contestDetails.getMaxReach() != 0)
            contestDto.setMaxReach(contestDetails.getMaxReach());
        if(contestDetails.getEndTime() != null)
            contestDto.setEndTime(contestDetails.getEndTime());
        if(contestDetails.getStatus() != null)
            contestDto.setStatus(contestDetails.getStatus());

        ContestDto contestDtoUpdated=contestService.updateContestInfos(contestDto);
        return  ResponseEntity.ok().body(contestDtoUpdated);
    }

    //Update draft contest
    @PutMapping("/update/draft/{id}")
    public ResponseEntity<ContestDto> updateDraftContest(@PathVariable(value = "id") Long contestId
            ,@Validated @RequestBody ContestDto contestDetails) throws ResourceNotFoundException, ParseException {
        ContestDto contestDto=contestService.getContestById(contestId);

        // if the contest does not exist, throw an exception
        if(contestDto==null) throw new ResourceNotFoundException("No Contest exist with  ID : "+contestId.toString());
        System.out.println(contestId.toString());
        //update information if available

        if(contestDetails.getTitle() != null)
            contestDto.setTitle(contestDetails.getTitle());
        if(contestDetails.getDescription() != null)
            contestDto.setDescription(contestDetails.getDescription());
        if(contestDetails.getImmediately() != null)
            contestDto.setImmediately(contestDetails.getImmediately());
        if(contestDetails.getStartDate() != null)
            contestDto.setStartDate(contestDetails.getStartDate());
        if(contestDetails.getEndDate() != null)
            contestDto.setEndDate(contestDetails.getEndDate());
        if(contestDetails.getTimeZone() != null)
            contestDto.setTimeZone(contestDetails.getTimeZone());
        if(contestDetails.getMaxReach() != 0)
            contestDto.setMaxReach(contestDetails.getMaxReach());
        if(contestDetails.getActionsNbr() != 0)
            contestDto.setActionsNbr(contestDetails.getActionsNbr());
        if(contestDetails.getWinnersNbr() != 0)
            contestDto.setWinnersNbr(contestDetails.getWinnersNbr());
        if(contestDetails.getStartTime() != null)
            contestDto.setStartTime(contestDetails.getStartTime());
        if(contestDetails.getEndTime() != null)
            contestDto.setEndTime(contestDetails.getEndTime());
        if(contestDetails.getStatus() != null)
            contestDto.setStatus(contestDetails.getStatus());
        if(contestDetails.getActions() != null)
            contestDto.setActions(contestDetails.getActions());
        if(contestDetails.getPrizes() != null)
            contestDto.setPrizes(contestDetails.getPrizes());

        ContestDto contestDtoUpdated=contestService.updateContestInfos(contestDto);
        return  ResponseEntity.ok().body(contestDtoUpdated);
    }

    //Delete contest
    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteContest(@PathVariable(value = "id") Long contestId)
            throws ResourceNotFoundException, ParseException {
        ContestDto contestDto = contestService.getContestById(contestId);
        if (contestDto==null) throw new ResourceNotFoundException("Contest not found for this id : "+contestId);

        contestService.deleteContest(contestDto);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Contest Deleted successfully",Boolean.TRUE);
        return  response;
    }
}
