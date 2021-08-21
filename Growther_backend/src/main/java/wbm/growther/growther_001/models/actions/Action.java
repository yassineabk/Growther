package wbm.growther.growther_001.models.actions;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import wbm.growther.growther_001.models.Contest;

import javax.persistence.*;

@Entity
@Table(name="Actions")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String provider;
    private String type;
    private String url;
    private int points;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idContest", nullable = false)
    @JsonIgnore
    private Contest contest;

    public Action(Action action) {
        this.provider=action.getProvider();
        this.url=action.getUrl();
        this.type=action.getType();
        this.points=action.getPoints();
    }

    public Action() {

    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public Contest getContest() {
        return contest;
    }

    public void setContest(Contest contest) {
        this.contest = contest;
    }
}
