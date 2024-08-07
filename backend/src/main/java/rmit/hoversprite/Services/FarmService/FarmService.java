package rmit.hoversprite.Services.FarmService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Repositories.DBFarmRepository.DBFarmRepository;
import rmit.hoversprite.Repositories.DBUserRepository.DBFarmerRepository;
import rmit.hoversprite.Utils.Utils;

@Component
public class FarmService {
    @Autowired
    DBFarmRepository farmRepository;

    @Autowired
    DBFarmerRepository farmerRepository;

    @Autowired
    Utils utilsClass;

    private Farm saveFarmToDataBase(Farm farm) {
        return farmRepository.save(farm);
    }

    public Farm userSaveFarm(String userId, Farm farm) {
        Farmer farmer = farmerRepository.findFarmerById(userId);
        if (farmer != null) {
            farm.setFarmer(farmer);  // Set the relationship
            List<Farm> listOfFarms = farmer.getFarms();

            // Generate farmID and assign it
            String generatedFarmId = utilsClass.generateFarmId(farmRepository.findAll());
            farm.setFarmID(generatedFarmId);

            listOfFarms.add(farm);  // Add the farm to the farmer's list
            farmer.setFarms(listOfFarms);
            farmerRepository.save(farmer);  // Save the farmer along with the farm

            return saveFarmToDataBase(farm);
        } else {
            throw new IllegalArgumentException("Farmer with ID " + userId + " not found");
        }
    }
}
