package wbm.growther.growther_001.utils;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.stereotype.Service;
import wbm.growther.growther_001.configurations.appConfiguration;
import wbm.growther.growther_001.dtos.UserDto;
import wbm.growther.growther_001.security.SecurityModel.SecurityUser;
import wbm.growther.growther_001.services.UserService;


import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtUtils {

    private appConfiguration appConfiguration;

    @Autowired
    private UserService userService;

    private static final Logger logger= LoggerFactory.getLogger(JwtUtils.class);

    public JwtUtils(wbm.growther.growther_001.configurations.appConfiguration appConfiguration) {
        this.appConfiguration = appConfiguration;
    }



    public String createToken(Authentication authentication) {

        UserDetails userDetails = (UserDetails)  authentication.getPrincipal();

        SecurityUser securityUser=(SecurityUser) userDetails;

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + appConfiguration.getAuth().getTokenExpirationMsec());
        Map<String,Object> map = new HashMap<>() ;
        map.put("email",securityUser.getEmail());
        return Jwts.builder()
                .addClaims(map)
                .setSubject(String.valueOf(securityUser.getId()))
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, appConfiguration.getAuth().getTokenSecret())
                .compact();
    }


    public String createTokenforOAuthUser(Authentication authentication) {

        DefaultOAuth2User userDetails = (DefaultOAuth2User)  authentication.getPrincipal();

        // SecurityUser securityUser=(SecurityUser) userDetails;
        String email= (String) userDetails.getAttributes().get("email");
        UserDto userDto= userService.getUserByEmail(email);
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + appConfiguration.getAuth().getTokenExpirationMsec());
        Map<String,Object> map = new HashMap<>() ;
        map.put("email",email);
        //map.put("Role",(userDto.isBrand())? "Brand" : "Client" );
        return Jwts.builder().addClaims(map)
                .setSubject(String.valueOf(userDto.getId()))
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, appConfiguration.getAuth().getTokenSecret())
                .compact();
    }


    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(appConfiguration.getAuth().getTokenSecret())
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(appConfiguration.getAuth().getTokenSecret()).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            logger.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty.");
        }
        return false;
    }


}
