package wbm.growther.growther_001.oath;


import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import wbm.growther.growther_001.models.AuthenticationProvider;
import wbm.growther.growther_001.models.users.Brand;
import wbm.growther.growther_001.oath.users.OAuthFactoryUserInfo;
import wbm.growther.growther_001.oath.users.OAuthUserInfo;
import wbm.growther.growther_001.repository.BrandRepository;

import javax.naming.AuthenticationException;
import java.security.Principal;
import java.util.Map;

@Service
public class CutomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User= super.loadUser(userRequest);

        try {

            return processOAuth2User(userRequest,oAuth2User);

        }catch (Exception ex){
            throw  new InternalAuthenticationServiceException(ex.getMessage(),ex.getCause());
        }



        //String clientName = userRequest.getClientRegistration().getClientName();
        //OAuth2User oAuth2User = super.loadUser(userRequest);
        //System.out.println("CustomOAuth2UserService invoked");
        //return new CustomOAuth2User(oAuth2User,clientName);
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {


        String registrationId= userRequest.getClientRegistration().getRegistrationId();
        Map<String ,Object> attributes= oAuth2User.getAttributes();
        OAuthUserInfo oAuthUserInfo= OAuthFactoryUserInfo.getOAuthUSerInfo(registrationId,attributes);

        // if we dont have access to the email
        if(oAuthUserInfo.getEmail().isEmpty())
            throw new OAuth2AuthenticationException("Email not found from OAuth2 provider");
        Brand brand=brandRepository.findBrandByEmail(oAuthUserInfo.getEmail());
        // if user already exist in the database with the same pOauth provider we update his infos
        if(brand != null){
            if(!brand.getAuthProvider().equals(AuthenticationProvider.valueOf(registrationId.toUpperCase())))
                throw  new OAuth2AuthenticationException("you alreadu signed up with your "
                        + brand.getAuthProvider()+" account. Please use your "+brand.getAuthProvider()
                        +" account to login." );

            brand = updateUser(brand,oAuthUserInfo);
        }
        else brand= registerNewUser(userRequest,oAuthUserInfo);

        return oAuth2User;

    }

    private Brand registerNewUser(OAuth2UserRequest userRequest, OAuthUserInfo oAuthUserInfo) {
        Brand brand=new Brand();
        String registrationId=userRequest.getClientRegistration().getRegistrationId();
        brand.setAuthProvider(AuthenticationProvider.valueOf(registrationId.toUpperCase()));
        brand.setEmail(oAuthUserInfo.getEmail());
        brand.setProviderId(oAuthUserInfo.getId());
        brand.setName(oAuthUserInfo.getName());
        return brandRepository.save(brand);
    }

    private Brand updateUser(Brand brand, OAuthUserInfo oAuthUserInfo) {
        brand.setName(oAuthUserInfo.getName());
        return brandRepository.save(brand);
    }
}
