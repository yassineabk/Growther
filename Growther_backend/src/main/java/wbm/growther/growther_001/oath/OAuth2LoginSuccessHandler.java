package wbm.growther.growther_001.oath;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import wbm.growther.growther_001.models.users.User;
import wbm.growther.growther_001.repository.UserRepository;
import wbm.growther.growther_001.security.AuthenticationProvider;
import wbm.growther.growther_001.services.UserService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Autowired
    private UserRepository repo;
    @Autowired
    private UserService userService;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getEmail();
        String name = oAuth2User.getName();
        User user = repo.findByEmail(email);
        if (user == null ){
            userService.createNewUserAfterOAuthLogin(email,name, AuthenticationProvider.GOOGLE);
        }else{
            userService.updateUserAfterOAuthLogin(user,name,AuthenticationProvider.GOOGLE);
        }

        System.out.println("USER EMAIL == "+email);

        super.onAuthenticationSuccess(request, response, authentication);
    }
}
