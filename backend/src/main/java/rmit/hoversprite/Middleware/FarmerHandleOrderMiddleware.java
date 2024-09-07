package rmit.hoversprite.Middleware;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.OrderQueue.OrderQueue;
import rmit.hoversprite.Services.OrderQueueService;
import rmit.hoversprite.Services.OrderService;

@Component
public class FarmerHandleOrderMiddleware {
    @Autowired
    OrderService orderService;

    @Autowired
    OrderQueueService orderQueueService;

    public OrderQueue checkOrderQueueFarmer(String orderID)
    {
        Order order = orderService.getOrderById(orderID);
        return orderQueueService.findQueueByOrder(order);
    }
}
