package rmit.hoversprite.Middleware;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.OrderQueue.OrderQueue;
import rmit.hoversprite.Proxies.OrderEmailProxy;
import rmit.hoversprite.Services.FarmerService;
import rmit.hoversprite.Services.OrderQueueService;
import rmit.hoversprite.Services.OrderService;
import rmit.hoversprite.Utils.Enum.OrderStatus;

@Component
public class FarmerHandleOrderMiddleware {
    @Autowired
    OrderService orderService;

    @Autowired
    OrderQueueService orderQueueService;

    @Autowired
    OrderEmailProxy orderEmailProxy;

    @Autowired
    FarmerService farmerService;

    public OrderQueue checkOrderQueueFarmer(String orderID)
    {
        Order order = orderService.getOrderById(orderID);
        return orderQueueService.findQueueByOrder(order);
    }

    public Order farmerCompleteOrder(String orderID)
    {
        Order order = orderService.getOrderById(orderID);
        // Find orderQueue by order id, if found, change the order status to completed and delete the record in the order queue
        if (orderQueueService.findQueueByOrder(order) != null) {
            // Change the order status
            order.setOrderStatus(OrderStatus.COMPLETED);
            orderService.updateOrder(order);
            // Delete the order from the queue and return the result
            orderQueueService.deleteQueueByOrder(order);
            
            System.out.println("Queue deleted");
            orderEmailProxy.sendEmailOrderCompletionAnnouncement(order);
            return order;
        }
        return null;
    }
}
