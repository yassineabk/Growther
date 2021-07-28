package wbm.growther.growther_001.security.SecurityModel;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import wbm.growther.growther_001.models.users.User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class SecurityUser implements UserDetails {

    private Long id;

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    private String email;
    private String password;
    private Map<String, Object> attributes;
    private Collection<? extends GrantedAuthority> authorities;

    public SecurityUser(Long id, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    public static SecurityUser Create(User user){
        List<GrantedAuthority> authorities;
        if(user.getIsBrand().equalsIgnoreCase("true"))
            authorities = Collections.
                singletonList(new SimpleGrantedAuthority("ROLE_BRAND"));
        else
            authorities = Collections.
                    singletonList(new SimpleGrantedAuthority("ROLE_CLIENT"));

        return  new SecurityUser(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                        authorities
        );
    }


    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
