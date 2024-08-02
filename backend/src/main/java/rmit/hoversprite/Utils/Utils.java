package rmit.hoversprite.Utils;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Model.User.Receptionist;
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
                .orElse("F000");

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
    
}
