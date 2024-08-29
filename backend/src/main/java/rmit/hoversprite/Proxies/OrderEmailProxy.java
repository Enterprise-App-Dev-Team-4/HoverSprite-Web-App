package rmit.hoversprite.Proxies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import rmit.hoversprite.Config.EmailSenderConfig;

@Service
public class OrderEmailProxy {
    @Autowired
    EmailSenderConfig emailSender;

    public void sendConfirmedEmail(String to, String subject, String text)
    {
        emailSender.sendSimpleEmail(to, subject, text);
    }
}
