package rmit.hoversprite.Middleware;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Services.FarmerService;

@Service
public class ReceptionistBooking {
    @Autowired
    FarmerService farmerService;

    public Farmer receptionistCheckFarmerPhoneNumber(String phoneNumber) throws Exception
    {
        return farmerService.getFarmerByPhoneNumber(phoneNumber);
    }
}
