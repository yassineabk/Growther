package wbm.growther.growther_001.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import wbm.growther.growther_001.dtos.ParticipationDto;
import wbm.growther.growther_001.exceptions.ResourceNotFoundException;
import wbm.growther.growther_001.services.ParticipationService;
import wbm.growther.growther_001.utils.JwtUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@RestController
@RequestMapping("api/participations")
public class ParticipationController {
    @Autowired
    private ParticipationService service;
    @Autowired
    private JwtUtils jwtUtils;

    private String getJwtTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }

    @GetMapping("/all")
    public List<ParticipationDto> getParticipations(){
        return service.getAllParticipations();
    }
    @GetMapping("/{id}")
    public ResponseEntity<ParticipationDto> getParticipationById(@PathVariable(value = "id") Long participationId) throws ResourceNotFoundException{
        ParticipationDto participationDto = service.getParticipationById(participationId);
        if (participationDto == null) throw new ResourceNotFoundException("No participation exist with ID : "+participationId);
        return ResponseEntity.ok().body(participationDto);
    }
    @PostMapping("/create/{id}")
    public Long createParticipation(@PathVariable(value = "id") Long contestID,
                                    @RequestBody ParticipationDto participationDto
            ,HttpServletRequest request) throws RejectedExecutionException {

        //get the email from the JWT token
        String token = getJwtTokenFromRequest(request);
        String email= jwtUtils.getUserEmailFromToken(token);
        Long newParticipation = service.createNewParticipation(participationDto,email,contestID);

        if(newParticipation != Long.decode("0")) return newParticipation;
        System.out.println(newParticipation);
        throw new RejectedExecutionException("A Participation with that ID already exist !!");
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<ParticipationDto> updateParticipation(@PathVariable(value = "id") Long participationId
            ,@Validated @RequestBody ParticipationDto participationDetails) throws ResourceNotFoundException {
        ParticipationDto participationDto = service.getParticipationById(participationId);

        // if the participation does not exist, throw an exception
        if(participationDto==null) throw new ResourceNotFoundException("No Participation exist with  ID : "+participationId);
        //update informations
        participationDto.setDone(participationDetails.isDone());
        participationDto.setTotalPoints(participationDetails.getTotalPoints());

        ParticipationDto participationDtoUpdated = service.updateParticipation(participationDto);

        return  ResponseEntity.ok().body(participationDtoUpdated);
    }

    //Delete contest
    @DeleteMapping("/delete/{id}")
    public Map<String, Boolean> deleteParticipation(@PathVariable(value = "id") Long participationId)
            throws ResourceNotFoundException {
        ParticipationDto participationDto = service.getParticipationById(participationId);
        if (participationDto==null) throw new ResourceNotFoundException("Participation not found for this id : "+participationId);

        service.deleteParticipation(participationDto);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Participation Deleted successfully",Boolean.TRUE);
        return  response;
    }
}
