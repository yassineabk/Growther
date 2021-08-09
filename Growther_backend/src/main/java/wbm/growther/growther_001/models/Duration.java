package wbm.growther.growther_001.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
@Entity
@Table(name = "duration")
public class Duration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    private int value;

    @OneToOne
    @MapsId
    @JoinColumn(name = "idContest")
    private Contest contest;


    public Duration(String type, int value, Contest contest) {
        this.type = type;
        this.value = value;
        this.contest = contest;
    }

    public Duration() {
    }

    @JsonIgnore
    public Contest getContest() {
        return contest;
    }

    @JsonProperty
    public void setContest(Contest contest) {
        this.contest = contest;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
