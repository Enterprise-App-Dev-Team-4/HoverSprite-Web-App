package rmit.hoversprite.Proxies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rmit.hoversprite.Model.Order.Order;

@Service
public class OrderEmailProxy {
    @Autowired
    EmailSenderService emailSenderService;

    public void sendEmailOrderConfirmed(Order order) {
        // Construct the email content
        String emailSubject = "Order Confirmation - Order ID: " + order.getOrderID();
        StringBuilder emailContent = new StringBuilder();
    
        emailContent.append("Dear ")
                    .append(order.getFarmer().getFullName())
                    .append(",\n\n")
                    .append("We are pleased to inform you that your order has been confirmed. Here are the details of your order:\n\n")
                    .append("Order ID: ").append(order.getOrderID()).append("\n")
                    .append("Order Date: ").append(order.getDate()).append("\n")
                    .append("Service Time Slot: ").append(order.getServiceTimeSlot()).append("\n")
                    .append("Order Status: ").append(order.getOrderStatus().name()).append("\n")
                    .append("Total Cost: $").append(String.format("%.2f", order.getTotalCost())).append("\n\n")
                    .append("Thank you for choosing our service!\n\n")
                    .append("Best regards,\n")
                    .append("Your Company Name");
    
        // Send the email
        emailSenderService.sendSimpleEmail(
                order.getFarmer().getEmail(), 
                emailSubject, 
                emailContent.toString()
        );
    }
    
}
