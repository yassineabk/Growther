package wbm.growther.growther_001.models.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import wbm.growther.growther_001.models.AuthenticationProvider;
import wbm.growther.growther_001.models.Contest;
import wbm.growther.growther_001.models.Participation;
import wbm.growther.growther_001.models.Winners;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Users",uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
@JsonIgnoreProperties({"password"})
public class User implements UserDetails {

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

    //contest creation
    @OneToMany(mappedBy="user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Contest> contests;

    // contest participation
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Participation> participations;

   /* @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Winners> winners;
    */

    private Boolean isLocked=false;
    private Boolean enabled=false;



    public Boolean getLocked() {
        return this.isLocked;
    }

    public void setLocked(Boolean locked) {
        isLocked = locked;
    }

    public Boolean getEnabled() {
        return this.enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

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

    public Set<Participation> getParticipations() {
        return participations;
    }

    public void setParticipations(Set<Participation> participations) {
        this.participations = participations;
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

    public Set<Contest> getContests() {
        return contests;
    }
    public void setContests(Set<Contest> contests) {
        this.contests = contests;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }
    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !isLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

}
