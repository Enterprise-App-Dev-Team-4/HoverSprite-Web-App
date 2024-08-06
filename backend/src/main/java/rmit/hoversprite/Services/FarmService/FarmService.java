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

    private Farm saveFarm(Farm farm)
    {
        if (farm.getFarmID() == null || farm.getFarmID().isEmpty()) 
        {
            List<Farm> farms = farmRepository.findAll();
            farm.setFarmID(utilsClass.generateFarmId(farms)); // Generate ID for farmer
        }
        return farmRepository.save(farm);
    }

    public Farm userSaveFarm(String userId,Farm farm)
    {
        Farmer farmer = farmerRepository.findFarmerById(userId);
        System.out.println("Hello World");
        if (farmer != null) {
            farm.setFarmer(farmer);  // Set the relationship
            List<Farm> listOfFarms = farmer.getFarms();
            listOfFarms.add(farm);  // Add the farm to the farmer's list
            
            farmer.setFarms(listOfFarms);
            farmerRepository.save(farmer);  // Save the farmer along with the farm
        }

        return saveFarm(farm);
    }
}
