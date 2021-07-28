package wbm.growther.growther_001.oath;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import wbm.growther.growther_001.utils.CookieUtils;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static wbm.growther.growther_001.oath.OAuth2AuthorisationCookie.REDIRECT_URI_PARAM_COOKIE_NAME;


@Component
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Autowired
    private OAuth2AuthorisationCookie authorisationCookie;


    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception)
            throws IOException, ServletException {

        String targetUrl = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME )
                .map(Cookie::getValue).orElse("/");
        targetUrl = UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("Error",exception.getLocalizedMessage())
                .build().toUriString();
        authorisationCookie.removeAuthorizationRequestCookies(request,response);

        getRedirectStrategy().sendRedirect(request,response,targetUrl);
    }
}
