package rmit.hoversprite.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import rmit.hoversprite.DTO.UserDTO.FarmerDTO;
import rmit.hoversprite.DTO.UserDTO.UserDTO;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.User;
import rmit.hoversprite.Services.RegisterService.RegisterService;
import rmit.hoversprite.Services.UserService.UserService;
import rmit.hoversprite.Utils.DTOConverter;
import rmit.hoversprite.Utils.Utils;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from this origin
//@CrossOrigin(origins = "http://127.0.0.1:5501")
public class UserController {

    @Autowired
    private RegisterService registerService;

    @Autowired
    private UserService userService;

    @Autowired
    private Utils utilClass;

    
     @PostMapping("/login")
    public ResponseEntity<?> returnUserData(@RequestBody User user, @RequestParam String type) {
        if ("farmer".equals(type)) {
            Farmer farmer = new Farmer();
            farmer.setUser(user);
            UserDTO userDTO = new DTOConverter().convertUserDataToObject(userService.login(farmer));
            // Assuming userService.login(farmer) handles the user login and throws an exception if unsuccessful.

            if (userDTO != null) {
                return ResponseEntity.ok(userDTO);  // Return 200 OK with body
            } else {
                return ResponseEntity.notFound().build();  // Return 404 Not Found if the user is not found or invalid
            }
        } else if("receptionist".equals(type))
        {
            Receptionist receptionist = new Receptionist();
            receptionist.setUser(user);
            UserDTO userDTO = new DTOConverter().convertUserDataToObject(userService.login(receptionist));
            // Assuming userService.login(farmer) handles the user login and throws an exception if unsuccessful.

            if (userDTO != null) {
                return ResponseEntity.ok(userDTO);  // Return 200 OK with body
            } else {
                return ResponseEntity.notFound().build();  // Return 404 Not Found if the user is not found or invalid
            }
        }

        // Return a BadRequest if the type parameter is incorrect or not provided
        return ResponseEntity.badRequest().body("Invalid type parameter. Expected 'farmer'.");
    }

    @PostMapping("register")
    public UserDTO saveUserToDatabase(@RequestBody User user, @RequestParam String type) { // http://localhost:8080/register?type=farmer
        if(type.equals("farmer"))
        {
            Farmer farmer = new Farmer();
            farmer.setUser(user);
            return new DTOConverter().convertUserDataToObject(registerService.register(farmer)); 
        } else if(type.equals("receptionist"))
        {
            Receptionist receptionist = new Receptionist();
            receptionist.setUser(user);
            return new DTOConverter().convertUserDataToObject(registerService.register(receptionist));
        }
        return null;
    }

    @GetMapping("")
    public UserDTO userProfilePage(@RequestParam String id)
    {
        User user = utilClass.getUserTypeById(id);
        if(user == null) return null;
        if(user instanceof Farmer)
        {
            Farmer farmer = new Farmer();
            farmer.setId(id);
            return new DTOConverter().convertUserDataToObject(userService.getUserData(farmer)); 
        }
        return null;
    }

    @PutMapping("") // when user are in the profile view, user click edit, a dialog pop up for user to edit
    public UserDTO usereditProfile(@RequestParam String id, @RequestParam String type)
    {
        return null;
    }
}
