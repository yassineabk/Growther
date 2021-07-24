package wbm.growther.growther_001.services.ServicesImplementation;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import wbm.growther.growther_001.dtos.BrandDto;
import wbm.growther.growther_001.models.users.Brand;
import wbm.growther.growther_001.repository.BrandRepository;
import wbm.growther.growther_001.services.BrandService;

import java.util.ArrayList;
import java.util.List;
@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public List<BrandDto> getAllBrands() {
        List<Brand> brands = brandRepository.findAll();
        return getBrandsDto(brands);
    }


    /*@Override
    public  BrandDto getBrandByEmailAndPassword(String Email, String Password) {

        Brand brand= brandRepository.findBrandByEmailAndPassword(Email, Password);
        return  (brand==null)? null :  mapToDto(brand);
    }

    @Override
    public Boolean createNewBrand(BrandDto NewBrandDto) {

        Brand NewBrand = mapToBrand(NewBrandDto);

        //check if a brand with the same email exist
        Brand brandExist = brandRepository
                .findBrandByEmail(NewBrand.getEmail());

        if(brandExist!=null) return false;
        brandRepository.save(NewBrand);
        return true;
    }*/

    @Override
    public BrandDto getBrandById(Long ID) {
        Brand brand=brandRepository.findBrandById(ID);
        return  (brand==null)? null :  mapToDto(brand);
    }

    @Override
    public BrandDto getBrandByEmail(String Email) {
        Brand brand=brandRepository.findBrandByEmail(Email);

        return (brand==null)? null :  mapToDto(brand);
    }

    @Override
    public BrandDto updateBrandInfos(BrandDto brandDto) {
        Brand brand=mapToBrand(brandDto);
        brandRepository.save(brand);
        return mapToDto(brandRepository.save(brand));
    }

    @Override
    public void deleteBrand(BrandDto brandDto) {
        Brand brand=mapToBrand(brandDto);
        brandRepository.delete(brand);
    }

    @Override
    public BrandDto getBrandByName(String Name) {
        Brand brand=brandRepository.findBrandByName(Name);

        return (brand==null)? null :  mapToDto(brand);
    }

    //convert model to DTO
    private BrandDto mapToDto(Brand brand){
        BrandDto brandDto=modelMapper.map(brand,BrandDto.class);
        return brandDto;
    }

    //convert Dto to model
    private Brand mapToBrand(BrandDto brandDto){
        Brand brand=modelMapper.map(brandDto,Brand.class);
        return brand;
    }

    // returns a list of brands DTO
    private List<BrandDto> getBrandsDto(List<Brand> brands){
        List<BrandDto> brandDtos=new ArrayList<>();

        brands.forEach( brand -> {
            BrandDto brandDto= mapToDto(brand);
            brandDtos.add(brandDto);
        });
        return brandDtos;
    }

}
