package rmit.hoversprite.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Repositories.DBFarmRepository;
import rmit.hoversprite.Repositories.DBFarmerRepository;
import rmit.hoversprite.Utils.Utils;

@Component
public class FarmService {
    @Autowired
    DBFarmRepository farmRepository;

    @Autowired
    DBFarmerRepository farmerRepository;

    @Autowired
    Utils utilsClass;

    public Farm saveFarmToDataBase(Farm farm) {
        return farmRepository.save(farm);
    }

    public List<Farm> getAllFarm()
    {
        return farmRepository.findAll();
    }

}
