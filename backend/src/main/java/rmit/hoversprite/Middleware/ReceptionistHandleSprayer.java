package rmit.hoversprite.Middleware;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Services.SprayerService;

@Component
public class ReceptionistHandleSprayer {
    @Autowired
    SprayerService sprayerService;

    public List<Sprayer> getAllSprayer()
    {
        return sprayerService.allSprayer();
    }
}
