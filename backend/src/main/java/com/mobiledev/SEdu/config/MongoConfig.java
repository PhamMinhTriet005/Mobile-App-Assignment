package com.mobiledev.SEdu.config;

import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoConfig {

    private static final Logger log = LoggerFactory.getLogger(MongoConfig.class);

    @Bean
    public MongoClient mongoClient(Environment env) {
        String uri = env.getProperty("spring.data.mongodb.uri");
        if (uri == null || uri.isBlank()) {
            uri = System.getenv("SPRING_DATA_MONGODB_URI");
        }
        if (uri == null || uri.isBlank()) {
            uri = "mongodb://mongodb:27017/SEdu_db"; // Default to docker service
        }
        log.info("Creating MongoClient with URI: {}", uri);
        return MongoClients.create(uri);
    }

    @Bean
    public MongoTemplate mongoTemplate(MongoClient client, Environment env) {
        String uri = env.getProperty("spring.data.mongodb.uri");
        if (uri == null || uri.isBlank()) {
            uri = System.getenv("SPRING_DATA_MONGODB_URI");
        }
        if (uri == null || uri.isBlank()) {
            uri = "mongodb://mongodb:27017/SEdu_db"; // Default to docker service
        }
        ConnectionString cs = new ConnectionString(uri);
        String db = cs.getDatabase();
        if (db == null || db.isBlank()) {
            db = "SEdu_db";
        }
        log.info("Using MongoTemplate database: {}", db);
        return new MongoTemplate(client, db);
    }
}
