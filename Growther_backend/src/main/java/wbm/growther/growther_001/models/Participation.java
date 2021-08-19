package wbm.growther.growther_001.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import wbm.growther.growther_001.models.users.User;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name="Participations")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Participation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date partipationDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idContest", nullable = false)
    @JsonIgnore
    private Contest contest;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idUser",nullable = true,updatable = false)
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy="participation", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<ParticipationAction> participationActions;

    private boolean isDone;
    private int totalPoints;

    public Participation() {
    }

    public Participation(Date partipationDate, Contest contest, User user, Set<ParticipationAction> participationActions, boolean isDone, int totalPoints) {
        this.partipationDate = partipationDate;
        this.contest = contest;
        this.user = user;
        this.participationActions = participationActions;
        this.isDone = isDone;
        this.totalPoints = totalPoints;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Date getPartipationDate() {
        return partipationDate;
    }

    public void setPartipationDate(Date partipationDate) {
        this.partipationDate = partipationDate;
    }

    public Contest getContest() {
        return contest;
    }

    public void setContest(Contest contest) {
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
