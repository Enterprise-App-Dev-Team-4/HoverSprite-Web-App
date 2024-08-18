package rmit.hoversprite.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.User;
import rmit.hoversprite.Repositories.DBFarmerRepository;
import rmit.hoversprite.Repositories.DBReceptionistRepository;

@Component
public class AppUserDetailsService implements UserDetailsService{
     @Autowired
    private DBFarmerRepository farmerRepository;

    @Autowired
    private DBReceptionistRepository receptionistRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // First, try to find the user as a Farmer
        Farmer farmer = farmerRepository.findByEmail(email);
        if (farmer != null) {
            return mapToUserDetails((User) farmer);
        }

        // If not found as a Farmer, try to find as a Receptionist
        Receptionist receptionist = receptionistRepository.findByEmail(email);
        if (receptionist != null) {
            return mapToUserDetails(receptionist);
        }

        // If not found in either, throw an exception
        throw new UsernameNotFoundException("User not found with email: " + email);
    }

    // Helper method to convert Farmer/Receptionist to UserDetails
    private UserDetails mapToUserDetails(User user) {
        return org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
            .password(user.getPassword())
            .authorities(user.getRole().name())  // Assuming role is a simple enum like USER or ADMIN
            .build();
    }
}
