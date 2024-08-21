package rmit.hoversprite.DTO.UserDTO;

import rmit.hoversprite.Utils.Enum.Role;

public class ReceptionistDTO extends UserDTO{
    public ReceptionistDTO() {}

    public ReceptionistDTO(String id, String email, String fullName, String firstName, String lastName, 
        String phoneNumber, String homeAddress, Role role, String token, String profileImage) {
        super(id, email, fullName, firstName, lastName, phoneNumber, homeAddress, role, token, profileImage);
    }
}
