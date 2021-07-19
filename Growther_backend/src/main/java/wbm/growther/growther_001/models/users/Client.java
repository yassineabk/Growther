package wbm.growther.growther_001.models.users;

import javax.persistence.*;

@Entity
@Table
public class Client  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50,nullable = false)
    private String email;

    //TODO password should be hashed
    @Column
    private String password;

    @Column(length = 50)
    private String authProvider;

    @Column(length = 50)
    private String name;


    public Client(Long id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public Client(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAuthProvider() { return authProvider; }

    public void setAuthProvider(String authProvider) { this.authProvider = authProvider; }
    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

}
