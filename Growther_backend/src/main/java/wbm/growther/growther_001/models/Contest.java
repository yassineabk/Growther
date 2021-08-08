package wbm.growther.growther_001.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import wbm.growther.growther_001.models.actions.Action;
import wbm.growther.growther_001.models.users.User;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.TimeZone;

@Entity
@Table(name="Contests")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Contest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idContest;
    private String title;
    private String description;
    private int winnersNbr;
    private int actionsNbr;
    private int maxReach;
    private Date startDate;
    private Date endDate;
    private String startTime;
    private String endTime;
    private int timeZone;
    @OneToOne(mappedBy = "contest", cascade = CascadeType.ALL)
    @JsonIgnore
    private Duration duration;
    //@OneToOne(mappedBy = "contest", cascade = CascadeType.ALL)
    //@JsonIgnore
    @OneToMany(mappedBy="contest", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //private Participation participation;
    private Set<Participation> participations;
    private String status;
    @OneToMany(mappedBy="contest", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Action> actions;
    //JSON field
    @OneToMany(mappedBy="contest", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Prize> prizes;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id",nullable = true,updatable = false)
    @JsonIgnore
    private User user;


    public Contest(String title, String description, int winnersNbr, int actionsNbr, int maxReach,
                   Date startDate, Date endDate, String startTime, String endTime,
                   int timeZone, Duration duration, Set<Participation> participations,
                   String status, Set<Action> actions, Set<Prize> prizes) {
        this.title = title;
        this.description = description;
        this.winnersNbr = winnersNbr;
        this.actionsNbr = actionsNbr;
        this.maxReach = maxReach;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime=startTime;
        this.endTime=endTime;
        this.timeZone = timeZone;
        this.duration = duration;
        this.participations = participations;
        this.status = status;
        this.actions = actions;
        this.prizes = prizes;
    }

    public Contest(Contest contest) {
        this.title = contest.getTitle();
        this.description = contest.getDescription();
        this.winnersNbr = contest.getWinnersNbr();
        this.actionsNbr = contest.getActionsNbr();
        this.maxReach = contest.getMaxReach();
        this.startDate = contest.getStartDate();
        this.endDate = contest.getEndDate();
        this.endTime = contest.getEndTime();
        this.startTime = contest.getStartTime();
        this.duration = contest.getDuration();
        this.actions = new HashSet(contest.getActions());
        this.prizes = new HashSet(contest.getPrizes());
        this.user= contest.getUser();
    }

    public Contest() {

    }

    public long getIdContest() {
        return idContest;
    }

    public void setIdContest(long id) {
        this.idContest = id;
    }

    public String getTitle() {
        return title;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Participation> getParticipations() {
        return participations;
    }

    public void setParticipations(Set<Participation> participations) {
        this.participations = participations;
    }

    public int getWinnersNbr() {
        return prizes.size();
    }

    public void setWinnersNbr(int winnersNbr) {
        this.winnersNbr = winnersNbr;
    }

    public int getActionsNbr() {
        return actions.size();
    }

    public void setActionsNbr(int actionsNbr) {
        this.actionsNbr = actionsNbr;
    }

    public int getMaxReach() { return maxReach; }

    public void setMaxReach(int maxReach) { this.maxReach = maxReach; }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
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

    //    public Long getDuration() { return ChronoUnit.DAYS.between(startDate.toInstant(), endDate.toInstant()); }
//
//    public void setDuration(Long duration) { this.duration = duration; }


    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
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
}
