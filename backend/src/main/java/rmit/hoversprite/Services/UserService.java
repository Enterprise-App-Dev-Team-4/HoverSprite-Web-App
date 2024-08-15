package rmit.hoversprite.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.User;
import rmit.hoversprite.Repositories.DBFarmRepository;
import rmit.hoversprite.Repositories.DBFarmerRepository;
import rmit.hoversprite.Repositories.DBReceptionistRepository;
import rmit.hoversprite.Utils.Utils;

@Component
public class UserService {

    @Autowired
    private DBFarmerRepository userRepository;

    @Autowired
    private DBReceptionistRepository receptionistRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private Utils utilsClass;

    private Farmer checkFarmerRegisterStatus(User user)
    {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash the password
        List<Farmer> farmers = userRepository.findAll();
        user.setId(utilsClass.generateFarmerId(farmers)); // Generate ID for farmer
        return userRepository.save((Farmer) user);
    }

    private Receptionist checkReceptionistRegisterStatus(User user)
    {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash the password
        List<Receptionist> receptionists = receptionistRepository.findAll();
        user.setId(utilsClass.generateReceptionistId(receptionists)); // Generate ID for farmer
        return receptionistRepository.save((Receptionist) user);
    }

    public User register(User user) {
        if(user instanceof Farmer)
        {
            Farmer status = checkFarmerRegisterStatus(user);
            return status;
        }

        if(user instanceof Receptionist)
        {
            Receptionist status =  checkReceptionistRegisterStatus(user);
            return status;
        }
        return null;
    }

    public User login(User user) {
        // Find farmer by username
        if(user instanceof Farmer)
        {
            Farmer farmer = userRepository.findByEmail(user.getEmail());
            if (farmer != null && passwordEncoder.matches(user.getPassword(), farmer.getPassword())) {
                return farmer;
            }
        } else if(user instanceof Receptionist)
        {
            Receptionist receptionist = receptionistRepository.findByEmail(user.getEmail());
            if (receptionist != null && passwordEncoder.matches(user.getPassword(), receptionist.getPassword())) {
                return receptionist;
            }
        }
        // If authentication fails, return empty
        return null;
    }

    public User getUserData(User user)
    {
        if(user instanceof Farmer)
        {
            Farmer farmer =  userRepository.findFarmerById(user.getId());
            return farmer;
        }
        return null;
    }
}
