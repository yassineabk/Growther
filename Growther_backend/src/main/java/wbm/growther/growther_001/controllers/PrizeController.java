package wbm.growther.growther_001.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import wbm.growther.growther_001.exceptions.NotFoundException;
import wbm.growther.growther_001.models.Prize;
import wbm.growther.growther_001.repository.ContestRepository;
import wbm.growther.growther_001.repository.PrizeRepository;

import java.util.List;

@RestController
@RequestMapping("api/contests")
public class PrizeController {
    @Autowired
    private ContestRepository contestRepository;
    @Autowired
    private PrizeRepository prizeRepository;

    @GetMapping("/{contestID}/prizes")
    public List getPrizeByContestId(@PathVariable Long contestID) {

        if(!contestRepository.existsById(contestID)) {
            throw new NotFoundException("Contest not found!");
        }

        return prizeRepository.findAllByContestIdContest(contestID);
    }

    @PostMapping("/{contestID}/prizes")
    public Prize addPrize(@PathVariable Long contestID,
                            @RequestBody Prize prize) {
        return contestRepository.findById(contestID)
                .map(contest -> {
                    prize.setContest(contest);
                    return prizeRepository.save(prize);
                })
                .orElseThrow(() -> new NotFoundException("Contest not found!"));
    }

    @PutMapping("/{contestID}/prizes/{prizeId}")
    public Prize updatePrize(@PathVariable Long contestID,
                               @PathVariable Long prizeId,
                               @RequestBody Prize prizeUpdated) {

        if(!contestRepository.existsById(contestID)) {
            throw new NotFoundException("Contest not found!");
        }

        return prizeRepository.findById(prizeId)
                .map(prize -> {
                    prize.setDescription(prizeUpdated.getDescription());

                    return prizeRepository.save(prize);
                }).orElseThrow(() -> new NotFoundException("Prize not found!"));
    }

    @DeleteMapping("/{contestID}/prizes/{prizeId}")
    public String deletePrize(@PathVariable Long contestID,
                                   @PathVariable Long prizeId) {

        if(!contestRepository.existsById(contestID)) {
            throw new NotFoundException("Contest not found!");
        }

        return prizeRepository.findById(prizeId)
                .map(prize -> {
                    prizeRepository.delete(prize);
                    return "Deleted Successfully!";
                }).orElseThrow(() -> new NotFoundException("Prize not found!"));
    }
}
