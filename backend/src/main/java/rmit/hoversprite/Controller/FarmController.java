package rmit.hoversprite.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Services.FarmService.FarmService;
import rmit.hoversprite.Services.UserService.UserService;

@RestController
@RequestMapping("/farm/")
@CrossOrigin(origins = "http://127.0.0.1:5501") // Allow requests from this origin
public class FarmController {
    @Autowired
    FarmService farmService;

    @PostMapping("add-farm")
    public Farm addFarm(@RequestBody Farm farm, @RequestParam String farmer_id)
    {
        return farmService.userSaveFarm(farmer_id, farm);
    }
}
