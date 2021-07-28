/*package wbm.growther.growther_001.security.Providers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import wbm.growther.growther_001.security.Authentications.EmailPasswordAuthentication;



@Component
public class EmailPasswrdAuthProvider implements AuthenticationProvider {


    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String email= authentication.getName();
        String password= (String) authentication.getCredentials();

        UserDetails user=userDetailsService.loadUserByUsername(email);
        if(passwordEncoder.matches(password,user.getPassword())){

            return  new EmailPasswordAuthentication(email,password,null);
        }

        throw  new BadCredentialsException("User not found, email or password are wrong ");
    }


    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.equals(EmailPasswordAuthentication.class) ;
    }

}
*/