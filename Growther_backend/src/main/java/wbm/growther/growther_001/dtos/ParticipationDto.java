package wbm.growther.growther_001.dtos;

import wbm.growther.growther_001.models.Contest;
import wbm.growther.growther_001.models.ParticipationAction;
import wbm.growther.growther_001.models.users.User;

import java.util.Date;
import java.util.Set;

public class ParticipationDto {

    private Long id;
    private Date partipationDate;
    private ContestDto contest;
    private User user;
    private Set<ParticipationAction> participationActions;
    private boolean isDone;
    private int totalPoints;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getPartipationDate() {
        return partipationDate;
    }

    public void setPartipationDate(Date partipationDate) {
        this.partipationDate = partipationDate;
    }

    public ContestDto getContestDto() {
        return contest;
    }

    public void setContestDto(ContestDto contest) {
        this.contest = contest;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<ParticipationAction> getParticipationActions() {
        return participationActions;
    }

    public void setParticipationActions(Set<ParticipationAction> participationActions) {
        this.participationActions = participationActions;
    }

    public boolean isDone() {
        return isDone;
    }

    public void setDone(boolean done) {
        isDone = done;
    }

    public int getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(int totalPoints) {
        this.totalPoints = totalPoints;
    }
}
