package wbm.growther.growther_001.security.SecurityModel;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import wbm.growther.growther_001.models.users.Brand;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

public class SecurityUser implements UserDetails, OAuth2User {

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

    public static SecurityUser Create(Brand brand){

        List<GrantedAuthority> authorities = Collections.
                singletonList(new SimpleGrantedAuthority("ROLE_USER"));

        return  new SecurityUser(
                brand.getId(),
                brand.getEmail(),
                brand.getPassword(),
                        authorities
        );
    }

    public static SecurityUser Create(Brand brand,Map<String,Object> attributes){

        SecurityUser securityUser=SecurityUser.Create(brand);
        securityUser.setAttributes(attributes);
        return securityUser;

    }




    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }



    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }


    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
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

    @Override
    public String getName() {
        return String.valueOf(id) ;
    }
}
