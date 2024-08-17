package rmit.hoversprite.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

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
}
