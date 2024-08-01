package rmit.hoversprite.Services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Repositories.DBUserRepository.DBFarmerRepository;

@Component
public class UserService {

    @Autowired
    private DBFarmerRepository farmerRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Farmer loginFarmer(Farmer user) {
        // Find farmer by username
        Farmer farmer = farmerRepository.findByEmail(user.getEmail());
        if (farmer != null && passwordEncoder.matches(user.getPassword(), farmer.getPassword())) {
            return farmer;
        }
        // If authentication fails, return empty
        return null;
    }

}
