package rmit.hoversprite.Middleware;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.User.Sprayer;
import rmit.hoversprite.Proxies.OrderEmailProxy;
import rmit.hoversprite.Proxies.WebSocketController;
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

    @Autowired
    OrderEmailProxy orderEmailProxy;

    @Autowired
    private WebSocketController webSocketController;

    public List<Sprayer> getAllSprayer()
    {
        return sprayerService.allSprayer();
    }
    
    public Order assignSprayers(AssignSprayerRequest request) {
        Order order = orderService.getOrderById(request.getOrderID());
        order.setSprayers(request.getSprayers());
    
        order.setOrderStatus(OrderStatus.ASSIGNED);
    
        // Iterate over the sprayers and update each one with the order
        for(int i = 0; i < order.getSprayers().size(); i++) {
            Sprayer sprayer = order.getSprayers().get(i);
            List<Order> listOfOrders = new ArrayList<>();
            if(sprayer.getOrders() != null)
            {
                listOfOrders = sprayer.getOrders();
            }
            listOfOrders.add(order);
            sprayer.setOrders(listOfOrders);
            sprayerService.updateSprayer(sprayer);
        }
    
        // Update the order in the database
        order = orderService.updateOrder(order);
    
        // Update the associated farmer's orders
        farmerService.updateOrderFarmer(order);

        //proxy email to farmer
        orderEmailProxy.sendEmailOrderAssigned(order);

        webSocketController.sendOrderAssignedNotification(order);
        return order;
    }
    
}
