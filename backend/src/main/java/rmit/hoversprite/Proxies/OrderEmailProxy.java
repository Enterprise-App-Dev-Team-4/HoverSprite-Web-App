package rmit.hoversprite.Proxies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rmit.hoversprite.Model.Order.Order;
import rmit.hoversprite.Model.User.Sprayer;

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
                    .append("Order Location: ").append(order.getLocation()).append("\n")
                    .append("Total Cost: $").append(String.format("%.2f", order.getTotalCost())).append("\n\n")
                    .append("Thank you for choosing our service!\n\n")
                    .append("Best regards,\n")
                    .append("Hover Sprite");

        // Send the email
        emailSenderService.sendSimpleEmail(
                order.getFarmer().getEmail(), 
                emailSubject, 
                emailContent.toString()
        );
    }

    public void sendEmailOrderCreated(Order order) {
        // Construct the email content
        String emailSubject = "Order Created - Order ID: " + order.getOrderID();
        StringBuilder emailContent = new StringBuilder();

        emailContent.append("Dear ")
                    .append(order.getFarmer().getFullName())
                    .append(",\n\n")
                    .append("Thank you for creating an order with us. Your order has been successfully created. Here are the details of your order:\n\n")
                    .append("Order ID: ").append(order.getOrderID()).append("\n")
                    .append("Order Date: ").append(order.getDate()).append("\n")
                    .append("Service Time Slot: ").append(order.getServiceTimeSlot()).append("\n")
                    .append("Order Status: ").append(order.getOrderStatus().name()).append("\n")
                    .append("Order Location: ").append(order.getLocation()).append("\n")
                    .append("Total Cost: $").append(String.format("%.2f", order.getTotalCost())).append("\n\n")
                    .append("We will notify you once the order has been confirmed.\n\n")
                    .append("Best regards,\n")
                    .append("Hover Sprite");

        // Send the email
        emailSenderService.sendSimpleEmail(
                order.getFarmer().getEmail(), 
                emailSubject, 
                emailContent.toString()
        );
    }

    public void sendEmailOrderCancelled(Order order) {
        // Construct the email content
        String emailSubject = "Order Cancelled - Order ID: " + order.getOrderID();
        StringBuilder emailContent = new StringBuilder();

        emailContent.append("Dear ")
                    .append(order.getFarmer().getFullName())
                    .append(",\n\n")
                    .append("We regret to inform you that your order has been cancelled. Here are the details of your order:\n\n")
                    .append("Order ID: ").append(order.getOrderID()).append("\n")
                    .append("Order Date: ").append(order.getDate()).append("\n")
                    .append("Service Time Slot: ").append(order.getServiceTimeSlot()).append("\n")
                    .append("Order Status: ").append(order.getOrderStatus().name()).append("\n")
                    .append("Order Location: ").append(order.getLocation()).append("\n")
                    .append("Total Cost: $").append(String.format("%.2f", order.getTotalCost())).append("\n\n")
                    .append("If you have any questions or need further assistance, please contact us.\n\n")
                    .append("Best regards,\n")
                    .append("Hover Sprite");

        // Send the email
        emailSenderService.sendSimpleEmail(
                order.getFarmer().getEmail(), 
                emailSubject, 
                emailContent.toString()
        );
    }

    public void sendEmailOrderAssigned(Order order) {
        // Construct the email content
        String emailSubject = "Order Assigned - Order ID: " + order.getOrderID();
        StringBuilder emailContent = new StringBuilder();

        emailContent.append("Dear ")
                    .append(order.getFarmer().getFullName())
                    .append(",\n\n")
                    .append("Your order has been assigned to one of our service providers. Here are the details of your order:\n\n")
                    .append("Order ID: ").append(order.getOrderID()).append("\n")
                    .append("Order Date: ").append(order.getDate()).append("\n")
                    .append("Service Time Slot: ").append(order.getServiceTimeSlot()).append("\n")
                    .append("Order Status: ").append(order.getOrderStatus().name()).append("\n")
                    .append("Order Location: ").append(order.getLocation()).append("\n");
                    // Add details of all sprayers assigned
                    emailContent.append("Sprayer(s) Assigned:\n");
                    for (Sprayer sprayer : order.getSprayers()) {
                        emailContent.append(" - Name: ").append(sprayer.getFullName()).append("\n")
                                    .append("   Phone: ").append(sprayer.getPhoneNumber()).append("\n")
                                    .append("   Email: ").append(sprayer.getEmail()).append("\n\n");
                    }
                    emailContent.append("Total Cost: $").append(String.format("%.2f", order.getTotalCost())).append("\n\n")
                    .append("The service provider will contact you shortly to confirm further details.\n\n")
                    .append("Best regards,\n")
                    .append("Hover Sprite");

        // Send the email
        emailSenderService.sendSimpleEmail(
                order.getFarmer().getEmail(), 
                emailSubject, 
                emailContent.toString()
        );
    }

    public void sendEmailOrderCompleted(Order order) {
        // Construct the email content
        String emailSubject = "Order Completed - Order ID: " + order.getOrderID();
        StringBuilder emailContent = new StringBuilder();

        emailContent.append("Dear ")
                    .append(order.getFarmer().getFullName())
                    .append(",\n\n")
                    .append("We are pleased to inform you that your order has been completed successfully. Here are the details of your order:\n\n")
                    .append("Order ID: ").append(order.getOrderID()).append("\n")
                    .append("Order Date: ").append(order.getDate()).append("\n")
                    .append("Service Time Slot: ").append(order.getServiceTimeSlot()).append("\n")
                    .append("Order Status: ").append(order.getOrderStatus().name()).append("\n")
                    .append("Order Location: ").append(order.getLocation()).append("\n")
                    .append("Total Cost: $").append(String.format("%.2f", order.getTotalCost())).append("\n\n")
                    .append("Thank you for choosing our service. We hope to serve you again in the future.\n\n")
                    .append("Best regards,\n")
                    .append("Hover Sprite");

        // Send the email
        emailSenderService.sendSimpleEmail(
                order.getFarmer().getEmail(), 
                emailSubject, 
                emailContent.toString()
        );
    }

    public void sendEmailOrderInProgress(Order order) {
        // Construct the email subject and content
        String emailSubject = "Order In Progress - Order ID: " + order.getOrderID();
        StringBuilder emailContent = new StringBuilder();
    
        emailContent.append("Dear ")
                    .append(order.getFarmer().getFullName())
                    .append(",\n\n")
                    .append("We are pleased to inform you that your order is now in progress. Here are the details of your order:\n\n")
                    .append("Order ID: ").append(order.getOrderID()).append("\n")
                    .append("Order Date: ").append(order.getDate()).append("\n")
                    .append("Service Time Slot: ").append(order.getServiceTimeSlot()).append("\n")
                    .append("Order Status: ").append(order.getOrderStatus().name()).append("\n")
                    .append("Order Location: ").append(order.getLocation()).append("\n\n")
                    .append("Sprayer(s) Assigned:\n");
    
        // Add details of all sprayers assigned
        for (Sprayer sprayer : order.getSprayers()) {
            emailContent.append(" - Name: ").append(sprayer.getFullName()).append("\n")
                        .append("   Phone: ").append(sprayer.getPhoneNumber()).append("\n")
                        .append("   Email: ").append(sprayer.getEmail()).append("\n\n");
        }
    
        emailContent.append("The service is now being executed and we will notify you once it's completed.\n\n")
                    .append("Thank you for choosing our service!\n\n")
                    .append("Best regards,\n")
                    .append("Hover Sprite");
    
        // Send the email
        emailSenderService.sendSimpleEmail(
                order.getFarmer().getEmail(), 
                emailSubject, 
                emailContent.toString()
        );
    }
    
}
