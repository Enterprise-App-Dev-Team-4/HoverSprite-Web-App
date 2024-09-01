package rmit.hoversprite.Request;

public class SprayerUpdateProfileRequest extends UserUpdateProfileRequest{
    public SprayerUpdateProfileRequest() {
        super();
    }

    public SprayerUpdateProfileRequest(String firstName, String lastName, String email, String phoneNumber, String profileImage)
    {
        super(firstName, lastName, email, phoneNumber, profileImage);
    }
}
