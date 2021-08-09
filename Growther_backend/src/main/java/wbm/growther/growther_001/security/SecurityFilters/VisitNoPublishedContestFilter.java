package wbm.growther.growther_001.security.SecurityFilters;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;

public class VisitNoPublishedContestFilter extends OncePerRequestFilter {

    public static final String REDIRECT_URI_PARAM_NAME = "redirect_uri";


    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest,
                                    HttpServletResponse httpServletResponse,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        try {

            Principal principal= (Principal) SecurityContextHolder
                    .getContext().getAuthentication().getPrincipal();





        }
        catch (Exception e){

        }



        filterChain.doFilter(httpServletRequest,httpServletResponse);

    }
}
