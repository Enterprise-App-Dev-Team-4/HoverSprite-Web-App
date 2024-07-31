package rmit.hoversprite.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.User;
import rmit.hoversprite.Services.RegisterService.RegisterService;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private RegisterService userService;

    @PostMapping("/register")
    public Farmer saveFarmerToDatabase(@RequestBody Farmer user) {
        return userService.registerUser(user);
    }
}
