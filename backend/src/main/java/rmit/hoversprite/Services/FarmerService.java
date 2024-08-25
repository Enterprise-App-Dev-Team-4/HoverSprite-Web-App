package rmit.hoversprite.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import rmit.hoversprite.Middleware.FarmerProfileUpdateRequestHandler;
import rmit.hoversprite.Model.Farm.Farm;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Repositories.DBFarmerRepository;
import rmit.hoversprite.Response.AuthenticationResponse;
import rmit.hoversprite.Utils.Utils;

@Component
public class FarmerService {
    @Autowired
    DBFarmerRepository farmerRepository;

    @Autowired
    FarmService farmService;

    @Autowired
    Utils utilsClass;

    @Autowired
    AuthenticationResponse authenticationResponse;

    @Autowired
    OrderService orderService;

    @Autowired
    FarmerProfileUpdateRequestHandler farmerUpdateProfileRequest;

    

    public Farm userSaveFarm(String userEmail, Farm farm) {
        Farmer farmer = farmerRepository.findByEmail(userEmail);
        if (farmer != null) {
            farm.setFarmer(farmer);  // Set the relationship
            List<Farm> listOfFarms = farmer.getFarms();

            // Generate farmID and assign it
            String generatedFarmId = utilsClass.generateFarmId(farmService.getAllFarm());
            farm.setFarmID(generatedFarmId);

            listOfFarms.add(farm);  // Add the farm to the farmer's list
            farmer.setFarms(listOfFarms);
            farmerRepository.save(farmer);  // Save the farmer along with the farm

            return farmService.saveFarmToDataBase(farm);
        } else {
            throw new IllegalArgumentException("Farmer with Email " + userEmail + " not found");
        }
    }

    public Farmer getFarmerData()
    {
        return authenticationResponse.getFarmerByToken();
    }

    @Transactional
    public Farmer updateFarmerProfile(Farmer farmer)
    {
        Farmer oldFarmer = getFarmerData();
        Farmer updateFarmer = farmerUpdateProfileRequest.farmerToFarmer(farmer, oldFarmer);
        return farmerRepository.save(updateFarmer);
    }

    public Order farmerCreateOrder(Order order)
    {
        System.out.print("Current Farmer Token: ");
        Farmer orderFarmer = farmerRepository.findByEmail(order.getFarmer().getEmail());
        
        System.out.println(orderFarmer.getToken());
        order.setFarmer(orderFarmer);
        List<Order> listOfOrders = orderFarmer.getServicOrders();

        //save order here
        Order savedOrder = orderService.createOrder(order); // new order id will be generated here
        listOfOrders.add(savedOrder); 
        orderFarmer.setServiceOrders(listOfOrders);
         
        farmerRepository.save(orderFarmer);
        return savedOrder;
    }

    public List<Order> farmerGetAllOrder()
    {
        Farmer requestFarmer = farmerRepository.findByEmail(getFarmerData().getEmail());
        return requestFarmer.getServicOrders();
    }
}
