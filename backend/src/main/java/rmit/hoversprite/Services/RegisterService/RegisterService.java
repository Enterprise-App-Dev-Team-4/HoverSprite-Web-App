package rmit.hoversprite.Services.RegisterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Repositories.DBRegisterRepository.DBRegisterRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Comparator;
import java.util.List;

import rmit.hoversprite.Utils.Utils;

@Service
public class RegisterService {
    @Autowired
    private DBRegisterRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private Utils utilsClass;

    public Farmer registerUser(Farmer user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // used to hash the password
        List<Farmer> farmers = userRepository.findAll();
        user.setId(utilsClass.generateFarmerId(farmers)); // generate id for farmer
        return userRepository.save(user);
    }
}
