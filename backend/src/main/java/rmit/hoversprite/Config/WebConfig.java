package rmit.hoversprite.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration

public class WebConfig implements WebMvcConfigurer{
      @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Mapping static resources
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("classpath:/static/", "classpath:/public/")
                .setCachePeriod(3600);  // Cache for 1 hour (3600 seconds)

    }
}
    