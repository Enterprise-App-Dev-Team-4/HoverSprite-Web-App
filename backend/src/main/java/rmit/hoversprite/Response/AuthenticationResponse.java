package rmit.hoversprite.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Config.JwtAuthFilter;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Model.User.User;
import rmit.hoversprite.Repositories.DBFarmerRepository;
import rmit.hoversprite.Repositories.DBReceptionistRepository;
import rmit.hoversprite.Repositories.DBSprayerRepository;

@Component
public class AuthenticationResponse {

    @Autowired
    private DBFarmerRepository farmerRepository;

    @Autowired
    private DBReceptionistRepository receptionistRepository;

    @Autowired
    private DBSprayerRepository sprayerRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtAuthFilter authFilter;


    public Farmer authenticateFarmer(User user) {
        Farmer farmer = farmerRepository.findByEmail(user.getEmail());
        if (farmer == null) {
            farmer = farmerRepository.findByPhoneNumber(user.getPhoneNumber());
        }

        if (farmer != null && passwordEncoder.matches(user.getPassword(), farmer.getPassword())) {
            return farmer;
        }
        return null;
    }

    public Receptionist authenticateReceptionist(User user) {
        Receptionist receptionist = receptionistRepository.findByEmail(user.getEmail());
        if (receptionist == null) {
            receptionist = receptionistRepository.findByPhoneNumber(user.getPhoneNumber());
        }

        if (receptionist != null && passwordEncoder.matches(user.getPassword(), receptionist.getPassword())) {
            return receptionist;
        }
        return null;
    }

    public Sprayer authenticateSprayer(User user) {
        Sprayer sprayer = sprayerRepository.findByEmail(user.getEmail());
        if (sprayer == null) {
            sprayer = sprayerRepository.findByPhoneNumber(user.getPhoneNumber());
        }

        if (sprayer != null && passwordEncoder.matches(user.getPassword(), sprayer.getPassword())) {
            return sprayer;
        }
        return null;
    }

    /**
     * Update token 
     * @param token
     * @param user
    */
    public User saveTokenToDataBase(String token, User user)
    {
        if(user instanceof Farmer)
        {
            Farmer farmer = farmerRepository.findByEmail(user.getEmail());
            farmer.setToken(token);
            farmerRepository.save(farmer);

            return (User) farmer;
        } else if(user instanceof Receptionist)
        {
            Receptionist receptionist = receptionistRepository.findByEmail(user.getEmail());
            receptionist.setToken(token);
            receptionistRepository.save(receptionist);

            return (User) receptionist;
        } else if(user instanceof Sprayer)
        {
            Sprayer sprayer = sprayerRepository.findByEmail(user.getEmail());
            sprayer.setToken(token);
            sprayerRepository.save(sprayer);
            return (User) sprayer;
        }
        return null;
    }

    public User deleteTokenInDatabase(User user)
    {
        if(user instanceof Farmer)
        {
            Farmer farmer = farmerRepository.findByEmail(user.getEmail());
            farmer.setToken(null);
            farmerRepository.save(farmer);

            return (User) farmer;
        } else if(user instanceof Receptionist)
        {
            Receptionist receptionist = receptionistRepository.findByEmail(user.getEmail());
            receptionist.setToken(null);
            receptionistRepository.save(receptionist);

            return (User) receptionist;
        }
        return null;
    }


    public Farmer getFarmerByToken()
    {
        String token = authFilter.getBrowserToken();
        return farmerRepository.findByToken(token);
    }

    public Receptionist getReceptionistByToken()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName(); // The email was set as the principal during authentication
            return receptionistRepository.findByEmail(email);
        }

        return null; // or throw an appropriate exception

    }
}
