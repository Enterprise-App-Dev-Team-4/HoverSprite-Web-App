package rmit.hoversprite.Services.RegisterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.User;
import rmit.hoversprite.Repositories.DBUserRepository.DBFarmerRepository;
import rmit.hoversprite.Repositories.DBUserRepository.DBReceptionistRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Comparator;
import java.util.List;

import rmit.hoversprite.Utils.Utils;

@Service
public class RegisterService {
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
}
