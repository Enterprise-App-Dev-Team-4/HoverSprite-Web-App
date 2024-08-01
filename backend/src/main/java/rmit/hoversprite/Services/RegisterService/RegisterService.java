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

    public Farmer registerUser(Farmer farmer) {
        farmer.setPassword(passwordEncoder.encode(farmer.getPassword())); // Hash the password
        
        List<Farmer> farmers = userRepository.findAll();
        farmer.setId(utilsClass.generateFarmerId(farmers)); // Generate ID for farmer

        return userRepository.save(farmer);
    }

    
    public Receptionist registerReceptionist(Receptionist recept) {
        recept.setPassword(passwordEncoder.encode(recept.getPassword())); // Hash the password
        
        List<Receptionist> recepts = receptionistRepository.findAll();
        recept.setId(utilsClass.generateReceptionistId(recepts)); // Generate ID for farmer

        return receptionistRepository.save(recept);
    }
}
