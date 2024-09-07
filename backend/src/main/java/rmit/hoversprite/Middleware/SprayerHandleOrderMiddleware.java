package rmit.hoversprite.Middleware;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.OrderQueue.OrderQueue;
import rmit.hoversprite.Proxies.OrderEmailProxy;
import rmit.hoversprite.Services.FarmerService;
import rmit.hoversprite.Services.OrderQueueService;
import rmit.hoversprite.Services.OrderService;
import rmit.hoversprite.Services.SprayerService;
import rmit.hoversprite.Utils.Enum.OrderStatus;

@Service
public class SprayerHandleOrderMiddleware {
    @Autowired
    SprayerService sprayerService;

    @Autowired
    FarmerService farmerService;

    @Autowired
    OrderService orderService;

    @Autowired
    OrderEmailProxy orderEmailProxy;

    @Autowired
    OrderQueueService orderQueueService;

    public Order sprayerConfirmAssignedOrder(String orderID)
    {
        Order order = orderService.getOrderById(orderID);
        order.setOrderStatus(OrderStatus.IN_PROGRESS);

        orderEmailProxy.sendEmailOrderInProgress(order);
        return orderService.updateOrder(order);
    }

    public OrderQueue sprayerCompleteOrder(String orderID) {
        try {
            // Retrieve the order by ID
            Order order = orderService.getOrderById(orderID);
            
            // Find orderQueue by order id, if found, change the order status to completed and delete the record in the order queue
            if (orderQueueService.findQueueByOrder(order) != null) {
                // Change the order status
                order.setOrderStatus(OrderStatus.COMPLETED);
                
                // Delete the order from the queue and return the result
                orderQueueService.deleteQueueByOrder(order);
                return null;
            }
            
            // If order queue is not found, create a new queue for the order
            OrderQueue queue = new OrderQueue();
            System.out.println("Order Queue");
            queue.setOrder(order);
            queue.setSprayer(sprayerService.getSprayerData());
            
            // Create and return the newly created order queue
            return orderQueueService.createOrderQueue(queue);
    
        } catch (Exception e) {
            // Log the exception message
            System.err.println("An error occurred: " + e.getMessage());
            
            // Optionally, rethrow the exception or return a null or custom error response
            throw e;
        }
    }
    
}
