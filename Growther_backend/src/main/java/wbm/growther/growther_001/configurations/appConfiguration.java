package wbm.growther.growther_001.configurations;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;


@ConfigurationProperties(prefix = "app")
public class appConfiguration {

    private final Auth auth =new Auth() ;

    private  final OAuth2 oAuth2= new OAuth2();

    public Auth getAuth() {
        return auth;
    }

    public OAuth2 getoAuth2() {
        return oAuth2;
    }


    public static class Auth{
        private String tokenSecret;

        public String getTokenSecret() {
            return tokenSecret;
        }

        public void setTokenSecret(String tokenSecret) {
            this.tokenSecret = tokenSecret;
        }

        public long getTokenExpirationMsec() {
            return tokenExpirationMsec;
        }

        public void setTokenExpirationMsec(long tokenExpirationMsec) {
            this.tokenExpirationMsec = tokenExpirationMsec;
        }

        private long tokenExpirationMsec;

    }

    public static class OAuth2{

        private List<String>authorizedRedirectUris= new ArrayList<>();


        public List<String> getAuthorizedRedirectUris() {
            return authorizedRedirectUris;
        }

        public void setAuthorizedRedirectUris(List<String> authorizedRedirectUris) {
            this.authorizedRedirectUris = authorizedRedirectUris;
        }
    }



}
