package rmit.hoversprite.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Model.User.User;
import rmit.hoversprite.Response.AuthenticationResponse;
import rmit.hoversprite.Response.ValidRegistrationResponse;

@Component
public class SignUpService {

    @Autowired
    private ValidRegistrationResponse registrationService;

    @Autowired
    private AuthenticationResponse authenticationResponse;

    public Farmer registerFarmer(User user) {
        return registrationService.registerFarmer(user);
    }

    public Receptionist registerReceptionist(User user) {
        return registrationService.registerReceptionist(user);
    }

    public Sprayer registerSprayer(User user)
    {
        return registrationService.registerSprayer(user);
    }

    public Farmer loginFarmer(Farmer farmer)
    {
        return authenticationResponse.authenticateFarmer(farmer);
    }

    public Receptionist loginReceptionist(Receptionist receptionist)
    {
        return authenticationResponse.authenticateReceptionist(receptionist);
    }

    public Sprayer loginSprayer(Sprayer sprayer)
    {
        return authenticationResponse.authenticateSprayer(sprayer);
    }

    public User updateTokenToUser(String token, User user)
    {
        return authenticationResponse.saveTokenToDataBase(token, user);
    }

    public User deleteTokenUser(User user)
    {
        return authenticationResponse.deleteTokenInDatabase(user);
    }
}
