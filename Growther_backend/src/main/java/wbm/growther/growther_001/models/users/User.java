package wbm.growther.growther_001.models.users;

import com.sun.istack.NotNull;
import wbm.growther.growther_001.models.AuthenticationProvider;

import javax.persistence.*;

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

    public boolean isBrand() {
        return isBrand;
    }

    public void setBrand(boolean brand) {
        isBrand = brand;
    }

    @NotNull
    @Column(length = 50)
    private String email;

    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthenticationProvider authProvider;

    @NotNull
    @Column
    private boolean isBrand;

    private String providerId;


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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
