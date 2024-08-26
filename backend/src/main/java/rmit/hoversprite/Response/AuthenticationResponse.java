package rmit.hoversprite.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Config.JwtAuthFilter;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.User;
import rmit.hoversprite.Repositories.DBFarmerRepository;
import rmit.hoversprite.Repositories.DBReceptionistRepository;

@Component
public class AuthenticationResponse {

    @Autowired
    private DBFarmerRepository farmerRepository;

    @Autowired
    private DBReceptionistRepository receptionistRepository;

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
        String token = authFilter.getBrowserToken();
        return receptionistRepository.findByToken(token);
    }
}
