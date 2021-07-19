package wbm.growther.growther_001.models.actions;

import wbm.growther.growther_001.models.Contest;

import javax.persistence.*;

@Entity
@Table(name="Actions")
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idContest")
    private Contest contest;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
