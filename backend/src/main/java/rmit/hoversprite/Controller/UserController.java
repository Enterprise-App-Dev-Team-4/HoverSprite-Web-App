package rmit.hoversprite.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Services.RegisterService.RegisterService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private RegisterService userService;

    @PostMapping("/register")
    public String registerUser(@RequestBody Farmer user) {
        if(userService.registerUser(user) != null)
        {
            return "Successfully";
        }
        return "Fail";
    }
}
