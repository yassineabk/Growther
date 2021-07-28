package wbm.growther.growther_001.oath.users;

import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import wbm.growther.growther_001.models.AuthenticationProvider;

import java.util.Map;

public  class OAuthFactoryUserInfo {

    public static OAuthUserInfo getOAuthUSerInfo(String registrationId, Map<String,Object> attributes){

        if(registrationId.equalsIgnoreCase(AuthenticationProvider.GOOGLE.toString()))
            return new GoogleUserInfo(attributes);
        else if (registrationId.equalsIgnoreCase(AuthenticationProvider.FACEBOOK.toString()))
            return new FacebookUserInfo(attributes);
        else throw new OAuth2AuthenticationException("Login with "+registrationId+" is not supported yet");

    }


}
