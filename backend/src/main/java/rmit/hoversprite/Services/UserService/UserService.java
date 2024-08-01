package rmit.hoversprite.Services.UserService;

import org.springframework.beans.factory.annotation.Autowired;

import rmit.hoversprite.Repositories.DBUserRepository.DBFarmerRepository;


public class UserService {
    @Autowired
    private DBFarmerRepository userRepository;

    
}
