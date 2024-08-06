package rmit.hoversprite.Utils;

import rmit.hoversprite.DTO.UserDTO.FarmerDTO;
import rmit.hoversprite.DTO.UserDTO.UserDTO;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.User;

public class DTOConverter {
    public DTOConverter() {}

    /**
     * @apiNote encapsulate the data to be sent to browser
     * @param farmer
     * @return the DTO object to the browser
     */
    public UserDTO convertUserDataToObject(User farmer) {
        if(farmer != null)
        {
            return new UserDTO(
                farmer.getId(),
                farmer.getEmail(),
                farmer.getFullName(),
                farmer.getPhoneNumber(),
                farmer.getHomeAddress()
            );
        }
        return null;
    }
}
