package rmit.hoversprite.Proxies;

import org.apache.commons.mail.EmailException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderEmailProxy {

    private final EmailSenderService emailSender;

    @Autowired
    public OrderEmailProxy(EmailSenderService emailSender) {
        this.emailSender = emailSender;
    }

    public void sendConfirmedEmail(String to) {
        try {
            emailSender.sendEmail(to, "Order Of Farmer", "Congratulations! Your order has been confirmed");
        } catch (EmailException e) {
            e.printStackTrace();
        }
    }
}
