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
import rmit.hoversprite.Middleware.ReceptionistProfileUpdateRequest;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Request.FarmerUpdateProfileRequest;
import rmit.hoversprite.Request.ReceptionistUpdateProfileRequest;
import rmit.hoversprite.Services.ReceptionistService;
import rmit.hoversprite.Utils.DTOConverter;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
public class ReceptionistController {
    @Autowired
    ReceptionistService receptionistService;

    @Autowired
    ReceptionistProfileUpdateRequest receptionistProfileUpdateRequest;


    @GetMapping("receptionist")
    @PreAuthorize("hasAuthority('Receptionist')")
    public ResponseEntity<?> getReceptioResponseEntity() 
    {
        System.out.println("Oke");
        UserDTO userDTO = new DTOConverter().convertUserDataToObject(receptionistService.getReceptionistData());
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("receptionistProfile")
    @PreAuthorize("hasAuthority('Receptionist')")

    public ResponseEntity<?> receptionistUpdateProfile(@RequestBody ReceptionistUpdateProfileRequest request )
    {
        Receptionist receptionist = new Receptionist();
        Receptionist updateReceptionist = receptionistProfileUpdateRequest.returnRequestPartToReceptionist(request, receptionist);
        UserDTO userDTO = new DTOConverter().convertUserDataToObject(receptionistService.updateReceptionistProfile(updateReceptionist));
        return ResponseEntity.ok(userDTO);
    }
}
