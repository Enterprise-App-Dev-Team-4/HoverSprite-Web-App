package rmit.hoversprite.Utils;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Model.User.User;

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
}
