package rmit.hoversprite.Proxies;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import rmit.hoversprite.Model.Order.Order;

@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // Handler to broadcast messages to all clients
    @MessageMapping("/sendMessage")
    public void broadcastMessage(String message) {
        messagingTemplate.convertAndSend("/all/messages", message);
    }

    public void sendOrderConfirmNotification(Order order) {
        // Include the order ID in the notification message
        String message = "Your Order with ID " + order.getOrderID() + " has been confirmed";
        
        // Send the message to the user (farmer) using their email as the identifier
        messagingTemplate.convertAndSendToUser(order.getFarmer().getEmail(), "/specific/messages", message);
    }
    
    public void sendOrderCanceledNotification(Order order) {
        // Include the order ID in the notification message
        String message = "Your Order with ID " + order.getOrderID() + " has been Canceled";
        
        // Send the message to the user (farmer) using their email as the identifier
        messagingTemplate.convertAndSendToUser(order.getFarmer().getEmail(), "/specific/messages", message);
    }
}
