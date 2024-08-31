package rmit.hoversprite;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.context.PropertyPlaceholderAutoConfiguration;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.event.EventListener;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import rmit.hoversprite.Proxies.EmailSenderService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@SpringBootApplication
public class HoverSpriteApplication {
	// @Autowired
	// private EmailSenderService senderService;
	private static final Logger logger = LogManager.getLogger(HoverSpriteApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(HoverSpriteApplication.class, args);
		logger.info("Application started successfully.");
	}

	// @EventListener(ApplicationReadyEvent.class)
	// public void triggerMail() throws MailException {
	// 	senderService.sendSimpleEmail("doanlamyomostt123@gmail.com",
	// 			"This is email body",
	// 			"This is email subject");

	// }
}
