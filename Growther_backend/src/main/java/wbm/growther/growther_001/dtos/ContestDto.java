package wbm.growther.growther_001.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import wbm.growther.growther_001.models.Prize;
import wbm.growther.growther_001.models.actions.Action;
import wbm.growther.growther_001.models.users.User;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.Set;

public class ContestDto {
    private long idContest;
    private String title;
    private String description;
    private int winnersNbr;
    private int actionsNbr;
    private int maxReach;
    private LocalDate startDate;
    private LocalDate endDate;
    private String startTime;
    private String endTime;
    private Integer timeZone;
    private Boolean immediately;
    private Set<Action> actions;
    private Set<Prize> prizes;
    private User user;
    private String status;

    @JsonProperty
    public long getIdContest() {
        return idContest;
    }

    @JsonIgnore
    public void setIdContest(long idContest) {
        this.idContest = idContest;
    }

    public String getTitle() {
        return title;
    }

    @Override
    public String toString() {
        return "ContestDto{" +
                "idContest=" + idContest +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", winnersNbr=" + winnersNbr +
                ", actionsNbr=" + actionsNbr +
                ", maxReach=" + maxReach +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", actions=" + actions +
                ", prizes=" + prizes +
                ", user=" + user +
                ", status='" + status + '\'' +
                '}';
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getWinnersNbr() {
        return winnersNbr;
    }

    public void setWinnersNbr(int winnersNbr) {
        this.winnersNbr = winnersNbr;
    }

    public int getActionsNbr() {
        return actionsNbr;
    }

    public void setActionsNbr(int actionsNbr) {
        this.actionsNbr = actionsNbr;
    }

    public int getMaxReach() {
        return maxReach;
    }

    public void setMaxReach(int maxReach) {
        this.maxReach = maxReach;
    }

    public Boolean getImmediately() {
        return immediately;
    }

    public void setImmediately(Boolean immediately) {
        this.immediately = immediately;
    }


    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public int getTimeZone() {
        return timeZone;
    }

    public void setTimeZone(int timeZone) {
        this.timeZone = timeZone;
    }

    public Set<Action> getActions() {
        return actions;
    }

    public void setActions(Set<Action> actions) {
        this.actions = actions;
    }

    public Set<Prize> getPrizes() {
        return prizes;
    }

    public void setPrizes(Set<Prize> prizes) {
        this.prizes = prizes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
