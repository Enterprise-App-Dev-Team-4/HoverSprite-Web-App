package rmit.hoversprite.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import rmit.hoversprite.DTO.UserDTO.FarmerDTO;
import rmit.hoversprite.DTO.UserDTO.UserDTO;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.User;
import rmit.hoversprite.Services.RegisterService.RegisterService;
import rmit.hoversprite.Services.UserService.UserService;
import rmit.hoversprite.Utils.DTOConverter;

@RestController
@RequestMapping("/")
public class UserController {

    @Autowired
    private RegisterService registerService;

    @Autowired
    private UserService userService;

    
    
    @PostMapping("login/farmer")
    public UserDTO returFarmerData(@RequestBody Farmer farmer)
    {
        return new DTOConverter().convertFarmerDataToObject(userService.loginFarmer(farmer)); // just call dto once every time a request recieved
    }


    @PostMapping("farmer/register")
    public Farmer saveFarmerToDatabase(@RequestBody Farmer user) {
        return registerService.registerUser(user);
    }

    @PostMapping("receptionist/register")
    public Receptionist saveReceptionistToDatabase(@RequestBody Receptionist user) {
        return registerService.registerReceptionist(user);
    }
}
