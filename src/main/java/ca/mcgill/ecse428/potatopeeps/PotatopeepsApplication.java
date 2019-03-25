package ca.mcgill.ecse428.potatopeeps;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Configuration
@RestController
@SpringBootApplication
public class PotatopeepsApplication {

	public static void main(String[] args) {
		SpringApplication.run(PotatopeepsApplication.class, args);
	}

	@RequestMapping("/hello")
	public String greeting(){
		return "Hello world!";
	}

}

