package wbm.growther.growther_001.models.users;



import javax.persistence.*;


@Entity
@Table
public class Brand   {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50,nullable = false)
    private String email;

    //password should be hashed
    @Column
    private String password;

    @Column(length = 50,nullable = false)
    private String name;

    @Column(length = 100)
    private String url;

    //Constructor

    public Brand( String email, String password, String name, String url) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.url = url;
    }

    public Brand() {

    }


    // Getters ans Setters

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
}
