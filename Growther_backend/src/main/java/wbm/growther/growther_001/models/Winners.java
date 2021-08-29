package wbm.growther.growther_001.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import wbm.growther.growther_001.models.users.User;

import javax.persistence.*;

@Entity
public class Winners {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   /* @ManyToOne
    @JoinColumn(name = "id",nullable = true,updatable = false)
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "idContest",nullable = true,updatable = false)
    @JsonIgnore
    private Contest contest;
*/
    private int rank;

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


}
