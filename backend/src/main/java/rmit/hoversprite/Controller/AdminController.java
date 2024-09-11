package rmit.hoversprite.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import rmit.hoversprite.DTO.SprayServicesDTO.SprayServicesDTO;
import rmit.hoversprite.DTO.UserDTO.UserDTO;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Services.SprayerFeatureServices;
import rmit.hoversprite.Utils.DTOConverter;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
public class AdminController {
    @Autowired
    private SprayerFeatureServices sprayerService;

    @GetMapping("service")
    public ResponseEntity<?> findService(@RequestParam String serviceID)
    {
        return ResponseEntity.ok(sprayerService.getServiceByID(serviceID));
    }

    @GetMapping("service/all")
    public ResponseEntity<List<SprayServicesDTO>> getAllServices(
        @RequestParam(required = false) String searchTerm,
        @RequestParam(required = false) String cropType,
        @RequestParam(required = false) String serviceType,
        @RequestParam(required = false, defaultValue = "serviceName") String sortBy,
        @RequestParam(required = false, defaultValue = "asc") String sortOrder
    ) {
        // Fetch all services initially
        List<SprayServices> services = sprayerService.listAllSprayServices();
        for(int i = 0; i < services.size(); i++)
        {
            System.out.println("Service are:");
            System.out.println(services.get(i).getTimeSlots());
        }
        if (searchTerm != null && !searchTerm.isEmpty()) {
            services = sprayerService.filterBySearch(searchTerm);
        }

        if (cropType != null && !cropType.isEmpty()) {
            services = sprayerService.filterByCropType(cropType);
        }

        if (serviceType != null && !serviceType.isEmpty()) {
            services = sprayerService.filterByServiceType(serviceType);
        }


        // // Filter full service out of page
        // services = sprayerService.allBookableServices(services);

        // Convert list of SprayServices to list of SprayServicesDTO
        List<SprayServicesDTO> serviceDTOs = services.stream()
            .map(new DTOConverter()::convertServiceDataToObject)
            .collect(Collectors.toList());
        
        // Return the list of SprayServicesDTO
        return ResponseEntity.ok(serviceDTOs);
    }


    @PostMapping("services/add")
    public ResponseEntity<?> addSprayServices(@RequestBody SprayServices sprayServices)
    {
        SprayServicesDTO services = new DTOConverter().convertServiceDataToObject(sprayerService.createSprayServices(sprayServices));
        
        System.out.println(services.getTimeSlots());
        return ResponseEntity.ok(services);
    }

    // @PutMapping("services/update")
    // public ResponseEntity<?> updateSprayServices(@RequestBody SprayServices sprayServices)
    // {
    //     SprayServicesDTO servicesDTO = new DTOConverter().convertServiceDataToObject(sprayerService.updateSprayServices(sprayServices));
    //     System.out.println("TIme slot: " + servicesDTO.getTimeSlots());
    //     return ResponseEntity.ok(servicesDTO);
    // }
}
