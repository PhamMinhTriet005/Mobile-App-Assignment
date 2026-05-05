package com.mobiledev.SEdu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class SEduApplication {

	public static void main(String[] args) {
		SpringApplication.run(SEduApplication.class, args);
	}

	@Bean
	public CommandLineRunner printMongoProperties(Environment env) {
		return args -> {
			System.out.println("=== EFFECTIVE MONGO PROPERTIES ===");
			System.out.println("spring.data.mongodb.uri=" + env.getProperty("spring.data.mongodb.uri"));
			System.out.println("spring.data.mongodb.host=" + env.getProperty("spring.data.mongodb.host"));
			System.out.println("spring.data.mongodb.port=" + env.getProperty("spring.data.mongodb.port"));
			System.out.println("SPRING_DATA_MONGODB_URI=" + System.getenv("SPRING_DATA_MONGODB_URI"));
		};
	}

}
