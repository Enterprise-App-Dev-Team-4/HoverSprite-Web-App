package rmit.hoversprite.Utils;

import rmit.hoversprite.DTO.FarmDTO.FarmDTO;
import rmit.hoversprite.DTO.OrderDTO.OrderDTO;
import rmit.hoversprite.DTO.UserDTO.FarmerDTO;
import rmit.hoversprite.DTO.UserDTO.UserDTO;
import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Model.Order.Order;
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
                farmer.getFirstName(),
                farmer.getLastName(),
                farmer.getPhoneNumber(),
                farmer.getHomeAddress(),
                farmer.getRole(),
                farmer.getToken(),
                farmer.getProfileImage()
            );
        }
        return null;
    }

    public FarmDTO convertFarmDataToObject(Farm farm)
    {
        if(farm != null)
        {
            return new FarmDTO(
                farm.getFarmID(),
                farm.getFarmArea(),
                farm.getCropType(),
                farm.getFarmLocation()
            );
        }
        return null;
    }

    public OrderDTO convertOrderDataToObject(Order order)
    {
        if(order != null)
        {
            return new OrderDTO(
                order.getOrderID(),
                order.getDate(),
                order.getServiceTimeSlot(),
                order.getOrderStatus(),
                order.getTotalCost(),
                order.getFarmer()
            );
        }
        return null;
    }
}
