package rmit.hoversprite.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.User;

@Component
public class UserService {

    @Autowired
    private SignUpService signUpService;


    public User register(User user) {
        if (user instanceof Farmer) {
            return signUpService.registerFarmer(user);
        } else if (user instanceof Receptionist) {
            return signUpService.registerReceptionist(user);
        }
        return null;
    }

    public User login(User user) {
        User foundUser = null;
        
        if (user instanceof Farmer) {
            foundUser = signUpService.loginFarmer((Farmer) user);
        } else if (user instanceof Receptionist) {
            foundUser = signUpService.loginReceptionist((Receptionist) user);
        }

        return foundUser;
    }
}
