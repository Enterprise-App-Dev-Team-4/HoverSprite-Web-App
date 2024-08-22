package rmit.hoversprite.Middleware;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Request.FarmerOrderRequest;

public class FarmerOrderRequestHandler {

    public FarmerOrderRequestHandler() {}
    
    public Order transferRequestToOrder(FarmerOrderRequest request)
    {
        Order order = new Order();
        order.setDate(request.getDate());
        order.setFarmer(request.getFarmer());
        order.setSprayerServices(request.getSprayServices());
        order.setServiceTimeSlot(request.getServiceTimeSlot());
        order.setTotalCost(request.getTotalCost());
        
        return order;
    }
}
