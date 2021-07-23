package wbm.growther.growther_001.oath;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import wbm.growther.growther_001.configurations.appConfiguration;
import wbm.growther.growther_001.utils.CookieUtils;
import wbm.growther.growther_001.utils.JwtUtils;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Optional;


import static wbm.growther.growther_001.oath.OAuth2AuthorisationCookie.REDIRECT_URI_PARAM_COOKIE_NAME;


@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private appConfiguration appConfiguration;

    private JwtUtils jwtUtils;

    private OAuth2AuthorisationCookie authorisationCookie;

    @Autowired
    OAuth2LoginSuccessHandler(appConfiguration appConfiguration,
                              JwtUtils jwtUtils,
                              OAuth2AuthorisationCookie authorisationCookie){
        this.appConfiguration=appConfiguration;
        this.authorisationCookie=authorisationCookie;
        this.jwtUtils=jwtUtils;
    }


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, ServletException {

        String targetUrl = getTargetUrl(request, response, authentication);

        if(response.isCommitted()){
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        clearAuthenticationAttributes(request,response);
        getRedirectStrategy().sendRedirect(request,response,targetUrl);


    }

    private void clearAuthenticationAttributes(HttpServletRequest request,
                                               HttpServletResponse response) {

        super.clearAuthenticationAttributes(request);
        authorisationCookie.removeAuthorizationRequestCookies(request,response);
    }

    private String getTargetUrl(HttpServletRequest request,
                                HttpServletResponse response,
                                Authentication authentication) {

        Optional<String> redirectUri = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

        if(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
            throw new RuntimeException("Sorry "+ redirectUri.get()+ "! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
        }
        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        String token = jwtUtils.createToken(authentication);

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("token", token)
                .build().toUriString();
    }

    private boolean isAuthorizedRedirectUri(String uri) {

        URI clientRedirectUri = URI.create(uri);

        return appConfiguration.getoAuth2().getAuthorizedRedirectUris()
                .stream().anyMatch(authorizedRedirectUri -> {

                    URI authorizedURI = URI.create(authorizedRedirectUri);
                    if(authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                            && authorizedURI.getPort() == clientRedirectUri.getPort()) {

                        return true;
                    }

                    return false;
                });

    }
}
