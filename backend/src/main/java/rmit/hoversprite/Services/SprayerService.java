package rmit.hoversprite.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import rmit.hoversprite.Middleware.SprayerProfileUpdateRequest;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Repositories.DBSprayerRepository;
import rmit.hoversprite.Response.AuthenticationResponse;
import rmit.hoversprite.Utils.Utils;

@Component
public class SprayerService {
    
    @Autowired
    Utils utilsClass;

    @Autowired
    AuthenticationResponse authenticationResponse;

    @Autowired
    SprayerProfileUpdateRequest sprayerProfileUpdateRequest;

    @Autowired
    DBSprayerRepository sprayerRepository;

    public Sprayer getSprayerData()
    {
        return authenticationResponse.getSprayerByToken();
    }

    @Transactional
    public Sprayer updateSprayerProfile(Sprayer sprayer)
    {
        Sprayer oldSprayer = getSprayerData();
        Sprayer editedSprayer = new Sprayer();
        Sprayer updateSprayer = sprayerProfileUpdateRequest.sprayerToSprayer(sprayer, oldSprayer);
        return sprayerRepository.save(updateSprayer);
    }
}
