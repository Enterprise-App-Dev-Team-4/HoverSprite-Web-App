package rmit.hoversprite.Middleware;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Proxies.EmailSenderService;
import rmit.hoversprite.Proxies.OrderEmailProxy;
import rmit.hoversprite.Request.ReceptionistHandleOrderRequest;
import rmit.hoversprite.Services.ReceptionistService;
import rmit.hoversprite.Utils.Enum.OrderStatus;

@Component
public class ReceptionistOrderCheckStatus {
    @Autowired
    ReceptionistService receptionistService;

    @Autowired
	private OrderEmailProxy orderEmailProxy;

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

    public void handleOrderEmail(Order order)
    {
        //check if the order confirmed or rejeceted
        if(order.getOrderStatus() == OrderStatus.CONFIRMED)
        {
            // send proxy
            orderEmailProxy.sendEmailOrderConfirmed(order);
        }

        if(order.getOrderStatus() == OrderStatus.CANCELLED)
        {
            // send proxy
            orderEmailProxy.sendEmailOrderCancelled(order);
        }

        if(order.getOrderStatus() == OrderStatus.ASSIGNED)
        {
            // send proxy
            orderEmailProxy.sendEmailOrderAssigned(order);
        }

        if(order.getOrderStatus() == OrderStatus.COMPLETED)
        {
            // send proxy
            orderEmailProxy.sendEmailOrderCompleted(order);
        }
    }

    public Order checkOrderStatus(ReceptionistHandleOrderRequest receptionistHandleOrderRequest) throws MailException
    {
        
        Order order = new Order();
        order.setOrder(transferToOrderData(receptionistHandleOrderRequest));
        System.out.println("Error here");
        Order savedOrder = receptionistService.receptionistHandleSpecificOrder(order);
        
        //Proxy
        handleOrderEmail(savedOrder);
        
        return savedOrder;
    }
}
