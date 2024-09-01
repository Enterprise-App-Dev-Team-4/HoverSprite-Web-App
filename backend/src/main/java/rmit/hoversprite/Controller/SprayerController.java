package rmit.hoversprite.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rmit.hoversprite.DTO.UserDTO.UserDTO;
import rmit.hoversprite.Middleware.SprayerProfileUpdateRequest;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Request.ReceptionistUpdateProfileRequest;
import rmit.hoversprite.Request.SprayerUpdateProfileRequest;
import rmit.hoversprite.Services.SprayerService;
import rmit.hoversprite.Utils.DTOConverter;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
public class SprayerController {
    @Autowired
    SprayerService sprayerService;

    @Autowired
    SprayerProfileUpdateRequest sprayerProfileUpdateRequest;

    @GetMapping("sprayer")
    public ResponseEntity<?> getSprayerResponseEntity() 
    {
        System.out.println("Oke");
        UserDTO userDTO = new DTOConverter().convertUserDataToObject(sprayerService.getSprayerData());
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("sprayerProfile")

    public ResponseEntity<?> receptionistUpdateProfile(@RequestBody SprayerUpdateProfileRequest request )
    {
        Sprayer sprayer = new Sprayer();
        
        Sprayer updateSprayer = sprayerProfileUpdateRequest.returnRequestPartToSprayer(request, sprayer);
        System.out.println("Email: " + updateSprayer.getEmail());
        UserDTO userDTO = new DTOConverter().convertUserDataToObject(sprayerService.updateSprayerProfile(updateSprayer));
        return ResponseEntity.ok(userDTO);
    }
}
