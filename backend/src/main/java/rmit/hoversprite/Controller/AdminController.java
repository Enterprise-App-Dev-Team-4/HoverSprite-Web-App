package rmit.hoversprite.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Services.SprayerFeatureServices;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
public class AdminController {
    @Autowired
    private SprayerFeatureServices sprayerService;

    @PostMapping("services/add")
    public SprayServices addSprayServices(@RequestBody SprayServices sprayServices)
    {
        return sprayerService.createSerSprayServices(sprayServices);
    }
}
