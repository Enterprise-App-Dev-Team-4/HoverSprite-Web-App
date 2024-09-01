package rmit.hoversprite.Middleware;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Request.ReceptionistUpdateProfileRequest;
import rmit.hoversprite.Request.SprayerUpdateProfileRequest;

@Component
public class SprayerProfileUpdateRequest {
    @Transactional
    public Sprayer returnRequestPartToSprayer(SprayerUpdateProfileRequest request,
        Sprayer sprayer)
    {
        try {
            String fullName = request.getFirstName() + " " + request.getLastName();
            System.out.print("Image Name: ");
            sprayer.setFirstName(request.getFirstName());
            sprayer.setLastName(request.getLastName());
            sprayer.setFullName(fullName);
            sprayer.setEmail(request.getEmail());
            sprayer.setPhoneNumber(request.getPhoneNumber());
            sprayer.setProfileImage(request.getProfileImage());
            return sprayer;
        }catch (Exception e) {
            return null;
        }
    }


    public Sprayer sprayerToSprayer(Sprayer newSprayer, Sprayer oldSprayer)
    {
        newSprayer.setPassword(oldSprayer.getPassword());
        newSprayer.setHomeAddress(oldSprayer.getHomeAddress());
        newSprayer.setId(oldSprayer.getId());
        newSprayer.setRole(oldSprayer.getRole());
        newSprayer.setOrders(oldSprayer.getOrders());
        newSprayer.setToken(oldSprayer.getToken());
        return newSprayer;
    }
}
