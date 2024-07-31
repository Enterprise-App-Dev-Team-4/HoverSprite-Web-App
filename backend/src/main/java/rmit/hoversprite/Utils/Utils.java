package rmit.hoversprite.Utils;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.User.Farmer;

@Component
public class Utils {
    public Utils() {}

    /**
     * @apiNote this function used to genrate the id for different actors when register the system
     * @param users
     * @return the id get
     */
    public String generateFarmerId(List<Farmer> users) {
        List<Farmer> farmers = users;
        String lastId = farmers.stream()
                .max(Comparator.comparing(Farmer::getId))
                .map(Farmer::getId)
                .orElse("F000");

        int numericPart = Integer.parseInt(lastId.substring(1)) + 1;
        return String.format("F%03d", numericPart);
    }
}
