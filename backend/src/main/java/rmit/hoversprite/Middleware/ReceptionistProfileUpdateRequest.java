package rmit.hoversprite.Middleware;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Request.FarmerUpdateProfileRequest;
import rmit.hoversprite.Request.ReceptionistUpdateProfileRequest;

@Component
public class ReceptionistProfileUpdateRequest {
    @Transactional
    public Receptionist returnRequestPartToReceptionist(ReceptionistUpdateProfileRequest request,
            Receptionist receptionist)
    {
        try {
            String fullName = request.getFirstName() + " " + request.getLastName();
            System.out.print("Image Name: ");
            receptionist.setFirstName(request.getFirstName());
            receptionist.setLastName(request.getLastName());
            receptionist.setFullName(fullName);
            receptionist.setEmail(request.getEmail());
            receptionist.setPhoneNumber(request.getPhoneNumber());
            receptionist.setProfileImage(request.getProfileImage());
            return receptionist;
        }catch (Exception e) {
            return null;
        }
    }


    public Receptionist receptionistToReceptionist(Receptionist newReceptionist, Receptionist oldReceptionist)
    {
        newReceptionist.setPassword(oldReceptionist.getPassword());
        newReceptionist.setHomeAddress(oldReceptionist.getHomeAddress());
        newReceptionist.setId(oldReceptionist.getId());
        newReceptionist.setRole(oldReceptionist.getRole());
        newReceptionist.setReceivedOrderes(oldReceptionist.getReceivedOrders());
        newReceptionist.setToken(oldReceptionist.getToken());
        return newReceptionist;

    }
}
