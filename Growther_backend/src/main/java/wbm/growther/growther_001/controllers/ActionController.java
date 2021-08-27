package wbm.growther.growther_001.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import wbm.growther.growther_001.exceptions.NotFoundException;
import wbm.growther.growther_001.models.actions.Action;
import wbm.growther.growther_001.repository.ActionRepository;
import wbm.growther.growther_001.repository.ContestRepository;

import java.util.List;

@RestController
@RequestMapping("api/contests")
public class ActionController {

    @Autowired
    private ActionRepository actionRepository;

    @Autowired
    private ContestRepository contestRepository;

    @GetMapping("/{contestID}/actions")
    public List getActionByContestId(@PathVariable Long contestID) {

        if(!contestRepository.existsById(contestID)) {
            throw new NotFoundException("Contest not found!");
        }

        return actionRepository.findAllByContestIdContest(contestID);
    }

    @PostMapping("/{contestID}/actions")
    public Action addAction(@PathVariable Long contestID,
                                @RequestBody Action action) {
        return contestRepository.findById(contestID)
                .map(contest -> {
                    action.setContest(contest);
                    return actionRepository.save(action);
                })
                .orElseThrow(() -> new NotFoundException("Contest not found!"));
    }

    @PutMapping("/{contestID}/actions/{actionId}")
    public Action updateAction(@PathVariable Long contestID,
                                       @PathVariable Long actionId,
                                       @RequestBody Action actiontUpdated) {

        if(!contestRepository.existsById(contestID)) {
            throw new NotFoundException("Contest not found!");
        }

        return actionRepository.findById(actionId)
                .map(action -> {
                    action.setProvider(actiontUpdated.getProvider());
                    action.setPoints(actiontUpdated.getPoints());
                    action.setType(actiontUpdated.getType());
                    action.setUrl(actiontUpdated.getUrl());
                    action.setEmail(actiontUpdated.getEmail());
                    action.setLink(actiontUpdated.getLink());
                    action.setText(actiontUpdated.getText());
                    action.setUsername(actiontUpdated.getUsername());

                    return actionRepository.save(action);
                }).orElseThrow(() -> new NotFoundException("Action not found!"));
    }

    @DeleteMapping("/{contestID}/actions/{actionId}")
    public String deleteAction(@PathVariable Long contestID,
                                   @PathVariable Long actionId) {

        if(!contestRepository.existsById(contestID)) {
            throw new NotFoundException("Contest not found!");
        }

        return actionRepository.findById(actionId)
                .map(action -> {
                    actionRepository.delete(action);
                    return "Deleted Successfully!";
                }).orElseThrow(() -> new NotFoundException("Action not found!"));
    }
}

