package wbm.growther.growther_001.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import wbm.growther.growther_001.models.users.User;

import javax.persistence.*;

@Entity
public class Winners {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idWinner;

    @ManyToOne
    @JoinColumn(name = "id",nullable = true,updatable = false)
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "idContest",nullable = true,updatable = false)
    @JsonIgnore
    private Contest contest;

    private int rank;

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public Long getIdWinner() {
        return idWinner;
    }

    public void setIdWinner(Long idWinner) {
        this.idWinner = idWinner;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Contest getContest() {
        return contest;
    }

    public void setContest(Contest contest) {
        this.contest = contest;
    }
}
