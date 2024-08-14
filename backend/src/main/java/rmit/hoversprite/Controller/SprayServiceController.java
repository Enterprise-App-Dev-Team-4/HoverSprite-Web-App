package rmit.hoversprite.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Services.UseCaseServices.UseCaseServices;

@RestController
@RequestMapping("/service/")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
public class SprayServiceController {
    @Autowired
    private UseCaseServices sprayServices;

    @PostMapping("add-service")
    public SprayServices addServices(@RequestBody SprayServices services)
    {
        return sprayServices.createSerSprayServices(services);
    }

    @GetMapping("")
    public List<SprayServices> getAllServices()
    {
        return sprayServices.listAllSprayServices();
    }
}
