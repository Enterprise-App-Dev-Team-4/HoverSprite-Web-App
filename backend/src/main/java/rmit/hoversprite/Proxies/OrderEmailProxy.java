package rmit.hoversprite.Proxies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderEmailProxy {
    @Autowired
    EmailSenderService emailSenderService;

    public void sendEmailOrderConfirmed(String to)
    {
        emailSenderService.sendSimpleEmail(to, "Order Farmer", "Your Order has been confirmed !");
    }
}
