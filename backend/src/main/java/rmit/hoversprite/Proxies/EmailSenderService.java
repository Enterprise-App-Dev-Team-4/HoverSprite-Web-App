package rmit.hoversprite.Proxies;

import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

    public EmailSenderService() {}

    public void sendEmail(String to, String subject, String messageText) throws EmailException {
        HtmlEmail email = new HtmlEmail();
        email.setHostName("smtp.gmail.com");
        email.setSmtpPort(587);
        email.setAuthentication("dinhminh181003@gmail.com", "prwkrmdhuixqpyrn");
        email.setStartTLSEnabled(true);
        email.setFrom("dinhminh181003@gmail.com");
        email.setSubject(subject);
        email.setHtmlMsg(messageText);
        email.addTo(to);
        email.send();
        System.out.println("Email sent successfully using Apache Commons Email.");
    }
}
