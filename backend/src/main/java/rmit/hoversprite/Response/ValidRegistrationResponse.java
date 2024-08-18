package rmit.hoversprite.Response;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.User;
import rmit.hoversprite.Repositories.DBFarmerRepository;
import rmit.hoversprite.Repositories.DBReceptionistRepository;
import rmit.hoversprite.Utils.Utils;

@Service
public class ValidRegistrationResponse {

    @Autowired
    private DBFarmerRepository farmerRepository;

    @Autowired
    private DBReceptionistRepository receptionistRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private Utils utilsClass;

    public Farmer registerFarmer(User user) {
        if (isDuplicateFarmer(user)) {
            return null;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash the password
        List<Farmer> farmers = farmerRepository.findAll();
        user.setId(utilsClass.generateFarmerId(farmers)); // Generate ID for farmer
        return farmerRepository.save((Farmer) user);
    }

    public Receptionist registerReceptionist(User user) {
        if (isDuplicateReceptionist(user)) {
            return null;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash the password
        List<Receptionist> receptionists = receptionistRepository.findAll();
        user.setId(utilsClass.generateReceptionistId(receptionists)); // Generate ID for receptionist
        return receptionistRepository.save((Receptionist) user);
    }

    private boolean isDuplicateFarmer(User user) {
        return farmerRepository.findByEmail(user.getEmail()) != null;
    }

    private boolean isDuplicateReceptionist(User user) {
        return receptionistRepository.findByEmail(user.getEmail()) != null;
    }
}
