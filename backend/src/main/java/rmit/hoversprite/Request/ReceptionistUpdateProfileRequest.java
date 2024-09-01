package rmit.hoversprite.Request;

public class ReceptionistUpdateProfileRequest extends UserUpdateProfileRequest{


    public ReceptionistUpdateProfileRequest() {
        super();
    }
    
    public ReceptionistUpdateProfileRequest(String firstName, String lastName, String email, String phoneNumber, String profileImage) {
        super(firstName, lastName, email, phoneNumber, profileImage);
    }
}
