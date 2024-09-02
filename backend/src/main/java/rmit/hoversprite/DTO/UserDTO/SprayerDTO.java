package rmit.hoversprite.DTO.UserDTO;

import java.util.List;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToMany;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Utils.Enum.Role;
import rmit.hoversprite.Utils.Enum.SprayerExpertise;

public class SprayerDTO extends UserDTO{
     @Enumerated(EnumType.STRING)
    private SprayerExpertise sprayerExpertise;

    // Default constructor
    public SprayerDTO() {
        super();
    }

    // Parameterized constructor
    public SprayerDTO(String id, String email, String fullName, String phoneNumber, String homeAddress,
     String firstName, String lastName, Role role, String token, String profileImage, SprayerExpertise sprayerExpertise) {
        super(id, email, fullName, firstName, lastName, phoneNumber, homeAddress, role, token, profileImage);
        this.sprayerExpertise = sprayerExpertise;
    }

    public SprayerExpertise getSprayerExpertise() {
        return sprayerExpertise;
    }

    public void setSprayerExpertise(SprayerExpertise sprayerExpertise) {
        this.sprayerExpertise = sprayerExpertise;
    }
}
