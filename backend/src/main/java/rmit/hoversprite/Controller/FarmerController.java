package rmit.hoversprite.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import rmit.hoversprite.DTO.FarmDTO.FarmDTO;
import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Services.FarmService;
import rmit.hoversprite.Services.FarmerService;
import rmit.hoversprite.Services.SprayerFeatureServices;
import rmit.hoversprite.Utils.DTOConverter;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
public class FarmerController {

    @Autowired
    private SprayerFeatureServices sprayServices;

    @Autowired
    private FarmerService farmerService;


    @PostMapping("farm/add-farm")
    public FarmDTO addFarm(@RequestBody Farm farm, @RequestParam String farmer_id)
    {
        return new DTOConverter().convertFarmDataToObject(farmerService.userSaveFarm(farmer_id, farm));
    }

    @GetMapping("service/all")
    public List<SprayServices> getAllServices()
    {
        return sprayServices.listAllSprayServices();
    }

    
}
