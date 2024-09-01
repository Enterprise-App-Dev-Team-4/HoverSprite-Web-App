package rmit.hoversprite.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Response.AuthenticationResponse;
import rmit.hoversprite.Utils.Utils;

@Component
public class SprayerService {
    
    @Autowired
    Utils utilsClass;

    @Autowired
    AuthenticationResponse authenticationResponse;

    public Sprayer getSprayerData()
    {
        return authenticationResponse.getSprayerByToken();
    }
}
