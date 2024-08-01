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

    
    @PostMapping("login")
    public UserDTO returFarmerData(@RequestBody User user, @RequestParam String type) //http://localhost:8080/login?type=farmer
    {
        if(type.equals("farmer"))
        {
            Farmer farmer = new Farmer();
            farmer.setUser(user);
            return new DTOConverter().convertUserDataToObject(userService.login(farmer)); // just call dto once every time a request recieved
        }
        return null;
    }


    @PostMapping("register")
    public User saveFarmerToDatabase(@RequestBody User user, @RequestParam String type) { // http://localhost:8080/register?type=farmer
        if(type.equals("farmer"))
        {
            Farmer farmer = new Farmer();
            farmer.setUser(user);
            return registerService.register(farmer);
        } else if(type.equals("receptionist"))
        {
            Receptionist receptionist = new Receptionist();
            receptionist.setUser(user);
            return registerService.register(receptionist);
        }
        return null;
    }
}
