package rmit.hoversprite.Utils;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Model.Feedback.FeedbackSprayer;
import rmit.hoversprite.Model.Feedback.OrderFeedback;
import rmit.hoversprite.Model.Feedback.OrderFeedback;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.OrderQueue.OrderQueue;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Model.User.User;
import rmit.hoversprite.Response.ExtractedDateAndTime;

@Component
public class Utils {
    public Utils() {}

    /**
     * @apiNote this function used to genrate the id for different actors when register the system
     * @param users
     * @return the id get
     */
    public String generateFarmerId(List<? extends User> users) {
        String lastId = users.stream()
                .max(Comparator.comparing(User::getId))
                .map(User::getId)
                .orElse("F000");

        int numericPart = Integer.parseInt(lastId.substring(1)) + 1;
        return String.format("F%03d", numericPart);
    }

    /**
     * @apiNote this function used to genrate the id for different actors when register the system
     * @param users
     * @return the id get
     */
    public String generateReceptionistId(List<? extends User> users) {
        String lastId = users.stream()
                .max(Comparator.comparing(User::getId))
                .map(User::getId)
                .orElse("R000");

        int numericPart = Integer.parseInt(lastId.substring(1)) + 1;
        return String.format("R%03d", numericPart);
    }

     /**
     * @apiNote this function checks if a given ID is a farmer or receptionist ID
     * @param id the ID to check
     * @return "Farmer" if the ID belongs to a farmer, "Receptionist" if it belongs to a receptionist, or "Unknown" if not recognized
     */
    public User getUserTypeById(String id) {
        if (id.startsWith("F")) {
            Farmer farmer = new Farmer();
            return farmer;
        } else if (id.startsWith("R")) {
            Receptionist receptionist = new Receptionist();
            return receptionist;
        }
        return null;
    }

    
    public String generateFarmId(List<Farm> farms) {
        String lastId = farms.stream()
            .map(Farm::getFarmID)
            .filter(id -> id.startsWith("FA")) // Ensure valid IDs
            .max(Comparator.comparingInt(id -> Integer.parseInt(id.substring(2))))
            .orElse("FA000"); // Default to "FA000" if no valid ID is found
    
        // Extract the numeric part of the ID and increment it
        int numericPart = Integer.parseInt(lastId.substring(2)) + 1;
    
        // Return the new ID formatted with a prefix "FA" and a three-digit number
        return String.format("FA%03d", numericPart);
    }
    
    public String generateSprayServiceId(List<SprayServices> services) {
        String lastId = services.stream()
            .map(SprayServices::getId)
            .filter(id -> id.startsWith("S")) // Ensure valid IDs
            .max(Comparator.comparingInt(id -> Integer.parseInt(id.substring(2))))
            .orElse("S000"); // Default to "FA000" if no valid ID is found
    
        // Extract the numeric part of the ID and increment it
        int numericPart = Integer.parseInt(lastId.substring(2)) + 1;
    
        // Return the new ID formatted with a prefix "FA" and a three-digit number
        return String.format("S%03d", numericPart);
    }

    public String generateOrderId(List<Order> orders) {
        String lastId = orders.stream()
            .map(Order::getOrderID)
            .filter(id -> id.startsWith("O")) // Ensure valid IDs
            .max(Comparator.comparingInt(id -> Integer.parseInt(id.substring(2))))
            .orElse("O000"); // Default to "FA000" if no valid ID is found
    
        // Extract the numeric part of the ID and increment it
        int numericPart = Integer.parseInt(lastId.substring(2)) + 1;
    
        // Return the new ID formatted with a prefix "FA" and a three-digit number
        return String.format("O%03d", numericPart);
    }

    public String generateSprayerId(List<Sprayer> sprayers) {
        String lastId = sprayers.stream()
            .map(Sprayer::getId)
            .filter(id -> id.startsWith("SS")) // Ensure valid IDs
            .max(Comparator.comparingInt(id -> Integer.parseInt(id.substring(2))))
            .orElse("SS000"); // Default to "FA000" if no valid ID is found
    
        // Extract the numeric part of the ID and increment it
        int numericPart = Integer.parseInt(lastId.substring(2)) + 1;
    
        // Return the new ID formatted with a prefix "FA" and a three-digit number
        return String.format("SS%03d", numericPart);
    }

    public String generateOrderFeedbackId(List<OrderFeedback> feedbacks) {
        String lastId = feedbacks.stream()
            .map(OrderFeedback::getFeedbackID)
            .filter(id -> id.startsWith("FB")) // Ensure valid IDs
            .max(Comparator.comparingInt(id -> Integer.parseInt(id.substring(2))))
            .orElse("FB000"); // Default to "FA000" if no valid ID is found
    
        // Extract the numeric part of the ID and increment it
        int numericPart = Integer.parseInt(lastId.substring(2)) + 1;
    
        // Return the new ID formatted with a prefix "FA" and a three-digit number
        return String.format("FB%03d", numericPart);
    }

    public String generateFeedbackSprayerId(List<FeedbackSprayer> feedbacks) {
        String lastId = feedbacks.stream()
            .map(FeedbackSprayer::getFeedbackID)
            .filter(id -> id.startsWith("FS")) // Ensure valid IDs
            .max(Comparator.comparingInt(id -> Integer.parseInt(id.substring(2))))
            .orElse("FS00"); // Default to "FA000" if no valid ID is found
    
        // Extract the numeric part of the ID and increment it
        int numericPart = Integer.parseInt(lastId.substring(2)) + 1;
    
        // Return the new ID formatted with a prefix "FA" and a three-digit number
        return String.format("FS%03d", numericPart);
    }

    public String generateOrderQueueId(List<OrderQueue> queues) {
        String lastId = queues.stream()
            .map(OrderQueue::getQueueID)
            .filter(id -> id.startsWith("Q")) // Ensure valid IDs
            .max(Comparator.comparingInt(id -> Integer.parseInt(id.substring(2))))
            .orElse("Q000"); // Default to "FA000" if no valid ID is found
    
        // Extract the numeric part of the ID and increment it
        int numericPart = Integer.parseInt(lastId.substring(2)) + 1;
    
        // Return the new ID formatted with a prefix "FA" and a three-digit number
        return String.format("Q%03d", numericPart);
    }

    public ExtractedDateAndTime dateAndTimeValueExtracted(String dateTime) {
        // Create a new instance of ExtractedDateAndTime
        ExtractedDateAndTime extractedDateAndTime = new ExtractedDateAndTime();
        
        // Split the input string based on the "T" character
        String[] parts = dateTime.split("T");
        
        // Set the date (before "T")
        extractedDateAndTime.setDate(parts[0]);
        
        // Set the time (after "T")
        extractedDateAndTime.setTime(parts[1]);
        
        return extractedDateAndTime;
    }
    
}
