package rmit.hoversprite.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import rmit.hoversprite.DTO.UserDTO.FarmerDTO;
import rmit.hoversprite.DTO.UserDTO.UserDTO;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.User;
import rmit.hoversprite.Services.UserService;
import rmit.hoversprite.Utils.DTOConverter;
import rmit.hoversprite.Utils.Utils;
import rmit.hoversprite.Utils.Enum.Role;
import rmit.hoversprite.Utils.JwtUtil;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Allow requests from this origin
//@CrossOrigin(origins = "http://127.0.0.1:5501")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    private ResponseEntity<?> handleFarmerLoginRequest(User user) {
        Farmer farmer = new Farmer();
        farmer.setUser(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );

        if (authentication.isAuthenticated()) {
            String token = jwtUtil.generateToken(farmer.getEmail());
            UserDTO userDTO = new DTOConverter().convertUserDataToObject(userService.login(farmer, token));
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.badRequest().body("Incorrect email, phone number, or password.");
        }
    }

    private ResponseEntity<?> handleReceptionistLoginRequest(User user) {
        Receptionist receptionist = new Receptionist();
        receptionist.setUser(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );

        if (authentication.isAuthenticated()) {
            String token = jwtUtil.generateToken(receptionist.getEmail());
            UserDTO userDTO = new DTOConverter().convertUserDataToObject(userService.login(receptionist, token));
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.badRequest().body("Incorrect email, phone number, or password.");
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> returnUserData(@RequestBody User user, @RequestParam String type) {
        if ("farmer".equals(type)) {
            return handleFarmerLoginRequest(user);
        }
        if("receptionist".equals(type))
        {
            return handleReceptionistLoginRequest(user);
        }

        // Return a BadRequest if the type parameter is incorrect or not provided
        return ResponseEntity.badRequest().body("Invalid type parameter");
    }

    @PostMapping("register")
    public ResponseEntity<?>saveUserToDatabase(@RequestBody User user, @RequestParam String type) { // http://localhost:8080/register?type=farmer
        if(type.equals("farmer"))
        {
            Farmer farmer = new Farmer();
            farmer.setUser(user);
            farmer.setRole(Role.Farmer);
            UserDTO farmerDTO =  new DTOConverter().convertUserDataToObject(userService.register(farmer));
            return ResponseEntity.ok(farmerDTO); 
        } else if(type.equals("receptionist"))
        {
            Receptionist receptionist = new Receptionist();
            receptionist.setUser(user);
            UserDTO receptionistDTO =  new DTOConverter().convertUserDataToObject(userService.register(receptionist));
            return ResponseEntity.ok(receptionistDTO); 
        }
        return ResponseEntity.badRequest().body("This user has been registered before");
    }
    
}
