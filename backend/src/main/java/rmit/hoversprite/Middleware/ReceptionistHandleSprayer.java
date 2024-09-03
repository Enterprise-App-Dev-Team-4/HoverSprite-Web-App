package rmit.hoversprite.Middleware;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Request.AssignSprayerRequest;
import rmit.hoversprite.Services.FarmerService;
import rmit.hoversprite.Services.OrderService;
import rmit.hoversprite.Services.ReceptionistService;
import rmit.hoversprite.Services.SprayerService;
import rmit.hoversprite.Utils.Enum.OrderStatus;
import rmit.hoversprite.Model.Order.Order;

@Component
public class ReceptionistHandleSprayer {
    @Autowired
    SprayerService sprayerService;

    @Autowired
    ReceptionistService receptionistService;

    @Autowired
    OrderService orderService;

    @Autowired
    FarmerService farmerService;

    public List<Sprayer> getAllSprayer()
    {
        return sprayerService.allSprayer();
    }
    
    public Order assignSprayers(AssignSprayerRequest request)
    {
        Order order = orderService.getOrderById(request.getOrderID());
        order.setSprayers(request.getSprayer());
        order.setOrderStatus(OrderStatus.ASSIGNED);
        // update in the service
        
        // update each sprayer with corresponding order
        for(int i = 0; i < order.getSprayers().size(); i++)
        {
            Sprayer sprayer = order.getSprayers().get(i);
            List<Order> listOfOrders = sprayer.getOrders();
            listOfOrders.add(order);
            sprayer.setOrders(listOfOrders);
            sprayerService.updateSprayer(sprayer);
        }

        //update order
        order = orderService.updateOrder(order);

        //update farmer
        farmerService.updateOrderFarmer(order);
        return order;
    }
}
