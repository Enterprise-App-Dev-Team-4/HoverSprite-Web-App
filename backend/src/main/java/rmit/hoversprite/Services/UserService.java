package rmit.hoversprite.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.Sprayer;
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
        } else if( user instanceof Sprayer)
        {
            return signUpService.registerSprayer(user);
        }
        return null;
    }

    public User login(User user, String token) {
        User foundUser = null;
        User userToken = signUpService.updateTokenToUser(token, user);
        if(userToken == null) return null;

        if (user instanceof Farmer) {
            foundUser = signUpService.loginFarmer((Farmer) user);
        } else if (user instanceof Receptionist) {
            foundUser = signUpService.loginReceptionist((Receptionist) user);
        }

        return foundUser;
    }

    public User logout(User user)
    {
        return signUpService.deleteTokenUser(user);
    }
}
