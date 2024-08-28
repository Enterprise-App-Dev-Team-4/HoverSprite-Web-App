package rmit.hoversprite.Middleware;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Request.ReceptionistHandleOrderRequest;
import rmit.hoversprite.Services.ReceptionistService;
import rmit.hoversprite.Utils.Enum.OrderStatus;

@Component
public class ReceptionistOrderCheckStatus {
    @Autowired
    ReceptionistService receptionistService;

    private Order transferToOrderData(ReceptionistHandleOrderRequest request)
    {
        Order order = new Order();
        order.setOrderID(request.getOrder().getOrderID());
        order.setOrderStatus(request.getOrder().getOrderStatus());
        order.setReceptionist(request.getOrder().getReceptionist());
        order.setSprayers(request.getOrder().getSprayers());
        return order;
    }

    public OrderStatus checkOrderStatus(ReceptionistHandleOrderRequest receptionistHandleOrderRequest)
    {
        Order order = transferToOrderData(receptionistHandleOrderRequest);
        Order savedOrder = receptionistService.receptionistHandleSpecificOrder(order);
        // check if the order confirmed or rejeceted
        if(order.getOrderStatus() == OrderStatus.CANCELLED)
        {
            // send proxy
            
        }
        return savedOrder.getOrderStatus();
    }
}
