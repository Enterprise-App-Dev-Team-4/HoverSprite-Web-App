package rmit.hoversprite.Middleware;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Proxies.OrderEmailProxy;
import rmit.hoversprite.Request.ReceptionistHandleOrderRequest;
import rmit.hoversprite.Services.ReceptionistService;
import rmit.hoversprite.Utils.Enum.OrderStatus;

@Component
public class ReceptionistOrderCheckStatus {
    @Autowired
    ReceptionistService receptionistService;

    private final OrderEmailProxy orderEmailProxy;

    @Autowired
    public ReceptionistOrderCheckStatus(OrderEmailProxy orderEmailProxy) {
        this.orderEmailProxy = orderEmailProxy;
    }

    private Order transferToOrderData(ReceptionistHandleOrderRequest request)
    {
        
        Order order = new Order();
        System.out.println("FOund R: ");
        order.setOrderID(request.getOrder().getOrderID());
        order.setOrderStatus(request.getOrder().getOrderStatus());
        order.setLocation(request.getOrder().getLocation());
        // order.setReceptionist(request.getOrder().getReceptionist());
        
        // order.setSprayers(request.getOrder().getSprayers());
        return order;
    }

    public Order checkOrderStatus(ReceptionistHandleOrderRequest receptionistHandleOrderRequest)
    {
        
        Order order = new Order();
        order.setOrder(transferToOrderData(receptionistHandleOrderRequest));
        System.out.println("Error here");
        Order savedOrder = receptionistService.receptionistHandleSpecificOrder(order);
        
        //check if the order confirmed or rejeceted
        if(savedOrder.getOrderStatus() == OrderStatus.CONFIRMED)
        {
            // send proxy
            orderEmailProxy.sendConfirmedEmail(savedOrder.getFarmer().getEmail());
        }
        return savedOrder;
    }
}
