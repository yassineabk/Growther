package wbm.growther.growther_001.models.actions;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.lang.Nullable;
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
    @Nullable
    private String username;
    @Nullable
    private String link;
    @Nullable
    private String email;
    @Nullable
    private String text;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idContest", nullable = false)
    @JsonIgnore
    private Contest contest;

    private int order;

    public int getOrder() { return order; }

    public void setOrder(int order) { this.order = order; }

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

    @Nullable
    public String getUsername() {
        return username;
    }

    public void setUsername(@Nullable String username) {
        this.username = username;
    }

    @Nullable
    public String getLink() {
        return link;
    }

    public void setLink(@Nullable String link) {
        this.link = link;
    }

    @Nullable
    public String getEmail() {
        return email;
    }

    public void setEmail(@Nullable String email) {
        this.email = email;
    }

    @Nullable
    public String getText() {
        return text;
    }

    public void setText(@Nullable String text) {
        this.text = text;
    }

    public Contest getContest() {
        return contest;
    }

    public void setContest(Contest contest) {
        this.contest = contest;
    }
}
