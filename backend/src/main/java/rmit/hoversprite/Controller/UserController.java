package rmit.hoversprite.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.User;
import rmit.hoversprite.Services.RegisterService.RegisterService;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private RegisterService userService;

    @PostMapping("/famer/register")
    public Farmer saveFarmerToDatabase(@RequestBody Farmer user) {
        return userService.registerUser(user);
    }

    @PostMapping("/receptionist/register")
    public Receptionist saveReceptionistToDatabase(@RequestBody Receptionist user) {
        return userService.registerReceptionist(user);
    }
}
