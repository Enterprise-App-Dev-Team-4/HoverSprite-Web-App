package rmit.hoversprite.DTO.UserDTO;

public class ReceptionistDTO extends UserDTO{
    public ReceptionistDTO() {}

    public ReceptionistDTO(String id, String email, String fullName, String firstName, String lastName, String phoneNumber, String homeAddress) {
        super(id, email, fullName, firstName, lastName, phoneNumber, homeAddress);
    }
}
