package rmit.hoversprite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@SpringBootApplication
public class HoverSpriteApplication {
	private static final Logger logger = LogManager.getLogger(HoverSpriteApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(HoverSpriteApplication.class, args);
		logger.info("Application started successfully.");
	}

	@Bean
    public BCryptPasswordEncoder passwordEncode() {
        return new BCryptPasswordEncoder();
    }
}
