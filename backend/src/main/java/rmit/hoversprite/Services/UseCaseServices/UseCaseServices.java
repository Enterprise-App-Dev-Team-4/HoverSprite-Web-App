package rmit.hoversprite.Services.UseCaseServices;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Repositories.DBServiceRepository.DBServiceRepository;
import rmit.hoversprite.Utils.Utils;

@Component
public class UseCaseServices {
    @Autowired
    DBServiceRepository serviceRepository;

    @Autowired
    Utils utilsClass;

    public SprayServices createSerSprayServices(SprayServices sprayServices)
    {
        // Generate service id and assign it
        String generatedServiceId = utilsClass.generateSprayServiceId(serviceRepository.findAll());
        sprayServices.setId(generatedServiceId);
        return serviceRepository.save(sprayServices);
    }
    
    public List<SprayServices> listAllSprayServices()
    {
        return serviceRepository.findAll();
    }
}
