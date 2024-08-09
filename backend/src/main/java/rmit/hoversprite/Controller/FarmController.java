package rmit.hoversprite.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import rmit.hoversprite.DTO.FarmDTO.FarmDTO;
import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Services.FarmService.FarmService;
import rmit.hoversprite.Services.UserService.UserService;
import rmit.hoversprite.Utils.DTOConverter;

@RestController
@RequestMapping("/farm/")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
public class FarmController {
    @Autowired
    FarmService farmService;

    @PostMapping("add-farm")
    public FarmDTO addFarm(@RequestBody Farm farm, @RequestParam String farmer_id)
    {
        return new DTOConverter().convertFarmDataToObject(farmService.userSaveFarm(farmer_id, farm));
    }
}
