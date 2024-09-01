package rmit.hoversprite.Request;

public class FarmerUpdateProfileRequest extends UserUpdateProfileRequest{

    public FarmerUpdateProfileRequest() {
        super();
    }
    
    public FarmerUpdateProfileRequest(String firstName, String lastName, String email, String phoneNumber, String profileImage) {
        super(firstName, lastName, email, phoneNumber, profileImage);
    }

}
