package wbm.growther.growther_001.services;

import wbm.growther.growther_001.dtos.BrandDto;
import wbm.growther.growther_001.models.users.Brand;
import java.util.List;


public interface BrandService {

    List<BrandDto> getAllBrands();
    BrandDto getBrandByEmailAndPassword(String Email,String Password);
    Boolean createNewBrand(BrandDto NewBrandDto);
    BrandDto getBrandById(Long brandID);
    BrandDto getBrandByEmail(String brandEmail);
    BrandDto updateBrandInfos(BrandDto brandDto);
    void deleteBrand(BrandDto brandDto);
    BrandDto getBrandByName(String brandName);

}
