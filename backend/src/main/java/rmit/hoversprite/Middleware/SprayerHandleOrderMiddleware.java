package rmit.hoversprite.Middleware;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Proxies.OrderEmailProxy;
import rmit.hoversprite.Services.FarmerService;
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

    public Order sprayerConfirmAssignedOrder(String orderID)
    {
        Order order = orderService.getOrderById(orderID);
        order.setOrderStatus(OrderStatus.IN_PROGRESS);

        orderEmailProxy.sendEmailOrderInProgress(order);
        return orderService.updateOrder(order);
    }
}
