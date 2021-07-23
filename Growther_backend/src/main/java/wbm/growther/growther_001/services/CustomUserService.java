package wbm.growther.growther_001.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import wbm.growther.growther_001.models.users.Brand;
import wbm.growther.growther_001.repository.BrandRepository;
import wbm.growther.growther_001.security.SecurityModel.SecurityUser;

@Service
public class CustomUserService implements UserDetailsService {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Brand brand = brandRepository.findBrandByEmail(email);
        if(brand == null)
            throw new UsernameNotFoundException("User not found !");
        return SecurityUser.Create(brand);
    }

    public UserDetails loadUserByUserId(Long userId) throws UsernameNotFoundException{

        Brand brand= brandRepository.findBrandById(userId);
        if(brand == null)
            throw new UsernameNotFoundException("User not found !!");
        return  SecurityUser.Create(brand);
    }
}
