package rmit.hoversprite.Services.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.User;
import rmit.hoversprite.Repositories.DBFarmRepository.DBFarmRepository;
import rmit.hoversprite.Repositories.DBUserRepository.DBFarmerRepository;
import rmit.hoversprite.Services.FarmService.FarmService;

@Component
public class UserService {

    @Autowired
    private DBFarmerRepository farmerRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private FarmService farmService;

    public User login(User user) {
        // Find farmer by username
        if(user instanceof Farmer)
        {
            Farmer farmer = farmerRepository.findByEmail(user.getEmail());
            if (farmer != null && passwordEncoder.matches(user.getPassword(), farmer.getPassword())) {
                return farmer;
            }
        } else if(user instanceof Receptionist)
        {
            
        }
        // If authentication fails, return empty
        return null;
    }

    public User getUserData(User user)
    {
        if(user instanceof Farmer)
        {
            Farmer farmer =  farmerRepository.findFarmerById(user.getId());
            return farmer;
        }
        return null;
    }
}
