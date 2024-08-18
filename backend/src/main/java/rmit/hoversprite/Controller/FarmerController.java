package rmit.hoversprite.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import rmit.hoversprite.DTO.FarmDTO.FarmDTO;
import rmit.hoversprite.DTO.UserDTO.UserDTO;
import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Response.AuthenticationResponse;
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
    public List<SprayServices> getAllServices(
        @RequestParam(required = false) String searchTerm,
        @RequestParam(required = false) String cropType,
        @RequestParam(required = false) String serviceType,
        @RequestParam(required = false, defaultValue = "serviceName") String sortBy,
        @RequestParam(required = false, defaultValue = "asc") String sortOrder
    )
    {
        // Fetch all services initially
        List<SprayServices> services = sprayServices.listAllSprayServices();

        if (searchTerm != null && !searchTerm.isEmpty()) {
            System.out.println(searchTerm);
            services = sprayServices.filterBySearch(searchTerm);
        }
        
        if (cropType != null && !cropType.isEmpty()) {
            services = sprayServices.filterByCropType(cropType);
        }

        if (serviceType != null && !serviceType.isEmpty()) {
            services = sprayServices.filterByServiceType(serviceType);
        }

        // Sort services (assuming sorting by service name or other criteria)
        // services = services.stream()
        //     .sorted((s1, s2) -> {
        //         int comparison = 0;
        //         if ("asc".equalsIgnoreCase(sortOrder)) {
        //             comparison = s1.getServiceName().compareTo(s2.getServiceName());
        //         } else if ("desc".equalsIgnoreCase(sortOrder)) {
        //             comparison = s2.getServiceName().compareTo(s1.getServiceName());
        //         }
        //         return comparison;
        //     })
        //     .collect(Collectors.toList());
            return services;
    }

    @GetMapping("userName")
    @PreAuthorize("hasAuthority('Farmer')")
    public ResponseEntity<?> userName() 
    {
        UserDTO userDTO = new DTOConverter().convertUserDataToObject(farmerService.getFarmerData());
        return ResponseEntity.ok(userDTO);
    }
    
}
