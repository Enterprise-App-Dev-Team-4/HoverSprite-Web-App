package rmit.hoversprite.Middleware;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.SprayerServices.SprayServices;
import rmit.hoversprite.Model.User.Farmer;
import rmit.hoversprite.Request.FarmerOrderRequest;
import rmit.hoversprite.Utils.Enum.OrderStatus;

public class FarmerOrderRequestHandler {

    public FarmerOrderRequestHandler() {}
    
    public Order transferRequestToOrder(FarmerOrderRequest request)
    {
        Order order = new Order();
        order.setDate(request.getDate());
        order.setSprayerServices(request.getSprayServices());
        order.setServiceTimeSlot(request.getServiceTimeSlot());
        order.setTotalCost(request.getTotalCost());
        order.setFarmer(request.getFarmer());
        order.setLocation(request.getLocation());
        order.setOrderStatus(OrderStatus.PENDING);
        return order;
    }


}
