package rmit.hoversprite.Middleware;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import rmit.hoversprite.Model.User.Farmer;

@Component
public class FarmerProfileUpdateRequest {
    @Transactional
    public Farmer returnRequestPartToFarmer(String firstName, String lastName, String email, String phoneNumber, MultipartFile profileImage,
            Farmer farmer)
    {
        try {
            String fullName = firstName + " " + lastName;
            farmer.setFirstName(firstName);
            farmer.setLastName(lastName);
            farmer.setFullName(fullName);
            farmer.setEmail(email);
            farmer.setPhoneNumber(phoneNumber);

            // If a profile image is provided, update it
            if (profileImage != null && !profileImage.isEmpty()) {
                farmer.setProfileImage(profileImage.getBytes());
            }
            return farmer;
        }catch (Exception e) {
            return null;
        }
    }

    /**
     * Use lastly
     * @param newFarmer
     * @param oldFarmer
     * @return
     */
    public Farmer farmerToFarmer(Farmer newFarmer, Farmer oldFarmer)
    {
        newFarmer.setPassword(oldFarmer.getPassword());
        newFarmer.setHomeAddress(oldFarmer.getHomeAddress());
        newFarmer.setId(oldFarmer.getId());
        newFarmer.setRole(oldFarmer.getRole());
        newFarmer.setServiceOrders(oldFarmer.getServicOrders());
        newFarmer.setToken(oldFarmer.getToken());
        return newFarmer;

    }
}
