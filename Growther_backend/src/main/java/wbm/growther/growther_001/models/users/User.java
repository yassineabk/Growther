package wbm.growther.growther_001.models.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import wbm.growther.growther_001.models.AuthenticationProvider;
import wbm.growther.growther_001.models.Contest;
import wbm.growther.growther_001.models.Participation;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Users",uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Column(length = 50)
    private String name;

    @Column(length = 100)
    private String url;

    @Column
    private String activities;
    @NotNull
    @Column(length = 50)
    private String email;

    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthenticationProvider authProvider;


    @Column(length = 10)
    private String isBrand="false";

    private String providerId;

    @OneToMany(mappedBy="user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Contest> contests;
    @OneToOne(mappedBy = "contest", cascade = CascadeType.ALL)
    @JsonIgnore
    private Participation participation;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", url='" + url + '\'' +
                ", activities='" + activities + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", authProvider=" + authProvider +
                ", isBrand='" + isBrand + '\'' +
                '}';
    }

    public Participation getParticipation() {
        return participation;
    }

    public void setParticipation(Participation participation) {
        this.participation = participation;
    }

    public String getActivities() {
        return activities;
    }

    public void setActivities(String activities) {
        this.activities = activities;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }


    public String getIsBrand() {
        return isBrand;
    }

    public void setIsBrand(String isBrand) {
        this.isBrand = isBrand;
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public User() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public AuthenticationProvider getAuthProvider() {
        return authProvider;
    }

    public void setAuthProvider(AuthenticationProvider authProvider) {
        this.authProvider = authProvider;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

    public String getBrand() {
        return isBrand;
    }

    @JsonIgnore
    public Set<Contest> getContests() {
        return contests;
    }
    @JsonProperty
    public void setContests(Set<Contest> contests) {
        this.contests = contests;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
