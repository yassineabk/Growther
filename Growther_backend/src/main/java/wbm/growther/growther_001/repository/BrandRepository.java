package wbm.growther.growther_001.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import wbm.growther.growther_001.exceptions.ResourceNotFoundException;
import wbm.growther.growther_001.models.users.Brand;


@Repository
public interface BrandRepository extends JpaRepository<Brand,Long> {

    Brand findBrandByEmailAndPassword(String Email,String Password);
    Brand findBrandById(Long ID);
    Brand findBrandByEmail(String Email) ;
    Brand findBrandByName(String Name);
}
