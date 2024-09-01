package rmit.hoversprite.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rmit.hoversprite.DTO.UserDTO.UserDTO;
import rmit.hoversprite.Services.SprayerService;
import rmit.hoversprite.Utils.DTOConverter;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
public class SprayerController {
    @Autowired
    SprayerService sprayerService;


    @GetMapping("sprayer")
    public ResponseEntity<?> getSprayerResponseEntity() 
    {
        System.out.println("Oke");
        UserDTO userDTO = new DTOConverter().convertUserDataToObject(sprayerService.getSprayerData());
        return ResponseEntity.ok(userDTO);
    }
}
