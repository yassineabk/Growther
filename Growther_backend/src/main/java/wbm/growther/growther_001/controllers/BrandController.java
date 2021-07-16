package wbm.growther.growther_001.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import wbm.growther.growther_001.dtos.BrandDto;
import wbm.growther.growther_001.exceptions.ResourceNotFoundException;
import wbm.growther.growther_001.services.BrandService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.RejectedExecutionException;

@RestController
@RequestMapping("/api/brands")
public class BrandController {

    @Autowired
    private BrandService brandService;


    @GetMapping("/Getbrands")
    public List<BrandDto> getBrands(){
        return brandService.getAllBrands();
    }

    @PostMapping("/Createbrand")
    public BrandDto createBrand(@RequestBody BrandDto brandDto) throws RejectedExecutionException {

        Boolean brandCreated = brandService.createNewBrand(brandDto);
        if(brandCreated) return brandDto;
        throw new RejectedExecutionException("A Brand with that email already exist !!");
    }


    @GetMapping("/{id}")
    public ResponseEntity<BrandDto> getBrandById(@PathVariable(value = "id") Long brandId)
            throws ResourceNotFoundException{
        BrandDto brandDto = brandService.getBrandById(brandId);
        if(brandDto==null) throw new ResourceNotFoundException("No brand exist with ID : "+brandId.toString());
        return ResponseEntity.ok().body(brandDto);
    }


    @GetMapping("/email/{email}")
    public ResponseEntity<BrandDto> getBrandByEmail(@PathVariable(value = "email") String brandEmail)
            throws ResourceNotFoundException{

        BrandDto brandDto = brandService.getBrandByEmail(brandEmail);
        if(brandDto==null) throw new ResourceNotFoundException("No brand exist with email: "+brandEmail);
        return ResponseEntity.ok().body(brandDto);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<BrandDto> getBrandByName(@PathVariable(value = "name") String brandName)
            throws ResourceNotFoundException{

        BrandDto brandDto = brandService.getBrandByName(brandName);
        if(brandDto==null) throw new ResourceNotFoundException("No brand exist with name: "+brandName);
        return ResponseEntity.ok().body(brandDto);
    }



    @PutMapping("/update/{id}")
    public ResponseEntity<BrandDto> updateBrand(@PathVariable (value = "id") Long brandId,
                                                @Validated @RequestBody BrandDto brandInfos) throws
            ResourceNotFoundException{

        BrandDto brandDto=brandService.getBrandById(brandId);

        // if the brand does not exist, throw an exception
        if(brandDto==null) throw new ResourceNotFoundException("No brand exist with  ID : "+brandId.toString());

        //update informations
        brandDto.setEmail(brandInfos.getEmail());
        brandDto.setName(brandInfos.getName());
        brandDto.setUrl(brandInfos.getUrl());

        BrandDto brandDtoUpdated=brandService.updateBrandInfos(brandDto);
        return  ResponseEntity.ok().body(brandDtoUpdated);
    }


    @DeleteMapping("/delete/{id}")
    public Map<String , Boolean> deleteBrand(@PathVariable(value = "id")Long brandId)
            throws ResourceNotFoundException{

        BrandDto brandDto=brandService.getBrandById(brandId);
        if(brandDto==null) throw new ResourceNotFoundException("No brand exist with  ID : "+brandId);

        brandService.deleteBrand(brandDto);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Brand Deleted successfully",Boolean.TRUE);
        return  response;
    }


}
