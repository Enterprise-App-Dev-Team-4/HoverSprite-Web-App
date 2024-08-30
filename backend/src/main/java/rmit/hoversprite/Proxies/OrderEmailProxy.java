// package rmit.hoversprite.Proxies;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.mail.MailException;
// import org.springframework.mail.SimpleMailMessage;
// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.mail.javamail.MimeMessageHelper;
// import org.springframework.stereotype.Component;
// import org.springframework.stereotype.Service;

// import jakarta.mail.MessagingException;
// import jakarta.mail.internet.MimeMessage;

// @Component
// public class OrderEmailProxy {

//     // @Value("${spring.mail.username}")
//     // private String fromEmail;

//     @Autowired
//     private JavaMailSender javaMailSender;


//     public void sendMail(String toEmail) {
//         System.out.println("sending email...");

//         MimeMessage message = javaMailSender.createMimeMessage();
// 		MimeMessageHelper helper = new MimeMessageHelper(message);
//         try {
//             helper.setFrom("dinhminh181003@gmail.com");
//             helper.setTo(toEmail);
//             helper.setSubject("topic");
//             helper.setText("body");
            
//             System.out.println("email successfully sent.");
//         } catch (Exception  e) {
//             System.err.println("Failed to send email: " + e.getMessage());
//         }
//         javaMailSender.send(message);
//         System.out.println("email successfully sent.");
//     }
// }
