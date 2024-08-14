package rmit.hoversprite.DTO.UserDTO;

import java.util.List;

import rmit.hoversprite.Model.Farm.Farm;

public class FarmerDTO extends UserDTO {
    public FarmerDTO() {}
    List<Farm> farms;
    public FarmerDTO(String id, String email, String fullName, String lastName, String firstName, String phoneNumber, String homeAddress, List<Farm> farms) {
        super(id, email, fullName,firstName, lastName, phoneNumber, homeAddress);
        this.farms = farms;
    }

    public List<Farm> getFarms()
    {
        return this.farms;
    }

    public void setFarms(List<Farm> farms)
    {
        this.farms = farms;
    }
}
