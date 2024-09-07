package rmit.hoversprite.Utils;

import java.util.List;
import java.util.stream.Collectors;

import rmit.hoversprite.DTO.FarmDTO.FarmDTO;
import rmit.hoversprite.DTO.FeedbackDTO.FeedbackDTO;
import rmit.hoversprite.DTO.OrderDTO.OrderDTO;
import rmit.hoversprite.DTO.OrderQueueDTO.OrderQueueDTO;
import rmit.hoversprite.DTO.SprayServicesDTO.SprayServicesDTO;
import rmit.hoversprite.DTO.UserDTO.FarmerDTO;
import rmit.hoversprite.DTO.UserDTO.SprayerDTO;
import rmit.hoversprite.DTO.UserDTO.UserDTO;
import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Model.Feedback.Feedback;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.OrderQueue.OrderQueue;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Sprayer;
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

    public SprayerDTO convertSprayerDataToObject(Sprayer sprayer)
    {
        if(sprayer != null)
        {
            return new SprayerDTO(
                sprayer.getId(),
                sprayer.getEmail(),
                sprayer.getFullName(),
                sprayer.getFirstName(),
                sprayer.getLastName(),
                sprayer.getPhoneNumber(),
                sprayer.getHomeAddress(),
                sprayer.getRole(),
                sprayer.getToken(),
                sprayer.getProfileImage(),
                sprayer.getSprayerExpertise()
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

    // New method to convert a list of Sprayer to a list of SprayerDTO
    public List<SprayerDTO> convertSprayerDataToObject(List<Sprayer> sprayers) {
        if (sprayers != null && !sprayers.isEmpty()) {
            return sprayers.stream()
                .map(this::convertSprayerDataToObject)
                .collect(Collectors.toList());
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
                order.getFarmer().getEmail(),
                order.getFarmer().getFullName(),
                order.getLocation(),
                order.getSprayerServices().getId(),
                order.getSprayerServices().getCropType(),
                order.getSprayerServices().getServiceName(),
                order.getSprayerServices().getServiceType(),
                convertSprayerDataToObject(order.getSprayers())
            );
        }
        return null;
    }

    public SprayServicesDTO convertServiceDataToObject(SprayServices services) {
        if (services != null) {
            return new SprayServicesDTO(
                services.getId(),             // id
                services.getPrice(),          // price
                services.getServiceName(),    // serviceName
                services.getServiceType(),    // serviceType
                services.getCropType(),       // cropType
                services.getDescription(),    // description
                services.getTimeSlots()       // timeSlots
            );
        }
        return null;
    }
    
    public FeedbackDTO convertFeedbackDataToObject(Feedback feedback)
    {
        if (feedback != null) {
            return new FeedbackDTO(
                feedback.getFeedbackID(),
                feedback.getContent(),
                feedback.getRatingScore(),
                feedback.getFarmer()
            );
        }
        return null;
    }

    public OrderQueueDTO convertQueueDataToObject(OrderQueue queue) throws Exception
    {
        if (queue != null) {
            return new OrderQueueDTO(
                queue.getQueueID(),
                (queue.getOrder() != null) ? queue.getOrder().getOrderID() : null,
                (queue.getFarmer() != null) ? queue.getFarmer().getEmail() : null,
                (queue.getSprayer() != null) ? queue.getSprayer().getEmail() : null
            );
        }
        return null;
    }
    
}
