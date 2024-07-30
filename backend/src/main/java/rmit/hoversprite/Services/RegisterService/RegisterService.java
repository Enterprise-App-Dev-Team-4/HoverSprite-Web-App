package rmit.hoversprite.Services.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Repositories.DBUserRepository.DBUserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Component
public class RegisterService {
    @Autowired
    private DBUserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Farmer registerUser(Farmer user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public void setUsername(String username)
    {

    }

    public void setPassword(String password)
    {
        
    }
}
