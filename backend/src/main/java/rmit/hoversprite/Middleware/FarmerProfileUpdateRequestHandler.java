package rmit.hoversprite.Middleware;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Request.FarmerUpdateProfileRequest;

@Component
public class FarmerProfileUpdateRequestHandler {
    @Transactional
    public Farmer returnRequestPartToFarmer(FarmerUpdateProfileRequest request,
            Farmer farmer)
    {
        try {
            String fullName = request.getFirstName() + " " + request.getLastName();
            System.out.print("Image Name: ");
            farmer.setFirstName(request.getFirstName());
            farmer.setLastName(request.getLastName());
            farmer.setFullName(fullName);
            farmer.setEmail(request.getEmail());
            farmer.setPhoneNumber(request.getPhoneNumber());
            farmer.setProfileImage(request.getProfileImage());
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
