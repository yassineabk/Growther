package wbm.growther.growther_001.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Entity
@Table(name="ParticipationActions")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ParticipationAction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String provider;
    private String type;
    private String url;
    private int points;
    private boolean isDone;
    private int ordre;
    //username -- link --- email --- text
    @Nullable
    private String username;
    @Nullable
    private String link;
    @Nullable
    private String email;
    @Nullable
    private String text;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idParticipation",nullable = true,updatable = false)
    @JsonIgnore
    private Participation participation;

    public ParticipationAction(String provider, String type, String url, int points) {
        this.provider = provider;
        this.type = type;
        this.url = url;
        this.points = points;
    }

    public ParticipationAction() {

    }

    public int getOrdre() {
        return ordre;
    }

    public void setOrdre(int ordre) {
        this.ordre = ordre;
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

    public Participation getParticipation() {
        return participation;
    }

    public void setParticipation(Participation participation) {
        this.participation = participation;
    }

    public boolean isDone() {
        return isDone;
    }

    public void setDone(boolean done) {
        isDone = done;
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
}
