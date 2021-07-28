package wbm.growther.growther_001.oath;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import wbm.growther.growther_001.models.AuthenticationProvider;
import wbm.growther.growther_001.models.users.User;
import wbm.growther.growther_001.oath.users.OAuthFactoryUserInfo;
import wbm.growther.growther_001.oath.users.OAuthUserInfo;
import wbm.growther.growther_001.repository.UserRepository;

import java.util.Map;

@Service
public class CutomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User= super.loadUser(userRequest);

        try {

            return processOAuth2User(userRequest,oAuth2User);

        }catch (Exception ex){
            throw  new InternalAuthenticationServiceException(ex.getMessage(),ex.getCause());
        }

    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {


        String registrationId= userRequest.getClientRegistration().getRegistrationId();
        Map<String ,Object> attributes= oAuth2User.getAttributes();
        OAuthUserInfo oAuthUserInfo= OAuthFactoryUserInfo.getOAuthUSerInfo(registrationId,attributes);

        // if we dont have access to the email
        if(oAuthUserInfo.getEmail().isEmpty())
            throw new OAuth2AuthenticationException("Email not found from OAuth2 provider");
        User user=userRepository.findUserByEmail(oAuthUserInfo.getEmail());

        // if user already exist in the database with the same pOauth provider we update his infos
        if(user != null){
            if(!user.getAuthProvider().equals(AuthenticationProvider.valueOf(registrationId.toUpperCase())))
                throw  new OAuth2AuthenticationException("you alreadu signed up with your "
                        + user.getAuthProvider()+" account. Please use your "+user.getAuthProvider()
                        +" account to login." );

            user = updateUser(user,oAuthUserInfo);
        }
        else user= registerNewUser(userRequest,oAuthUserInfo);

        return oAuth2User;

    }

    private User registerNewUser(OAuth2UserRequest userRequest, OAuthUserInfo oAuthUserInfo) {
        User user = new User();
        String registrationId=userRequest.getClientRegistration().getRegistrationId();
        user.setAuthProvider(AuthenticationProvider.valueOf(registrationId.toUpperCase()));
        user.setEmail(oAuthUserInfo.getEmail());
        user.setProviderId(oAuthUserInfo.getId());
        user.setName(oAuthUserInfo.getName());
        return userRepository.save(user);
    }

    private User updateUser(User user, OAuthUserInfo oAuthUserInfo) {
        user.setName(oAuthUserInfo.getName());
        return userRepository.save(user);
    }
}
