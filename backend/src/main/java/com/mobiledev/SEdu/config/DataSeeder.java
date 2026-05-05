package com.mobiledev.SEdu.config;

import com.mobiledev.SEdu.domain.Language;
import com.mobiledev.SEdu.domain.Question;
import com.mobiledev.SEdu.domain.Topic;
import com.mobiledev.SEdu.domain.Vocabulary;
import com.mobiledev.SEdu.persistence.LanguagePersistence;
import com.mobiledev.SEdu.persistence.QuestionPersistence;
import com.mobiledev.SEdu.persistence.TopicPersistence;
import com.mobiledev.SEdu.persistence.VocabularyPersistence;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    private final LanguagePersistence languagePersistence;
    private final TopicPersistence topicPersistence;
    private final VocabularyPersistence vocabularyPersistence;
    private final QuestionPersistence questionPersistence;

    public DataSeeder(LanguagePersistence languagePersistence,
                      TopicPersistence topicPersistence,
                      VocabularyPersistence vocabularyPersistence,
                      QuestionPersistence questionPersistence) {
        this.languagePersistence = languagePersistence;
        this.topicPersistence = topicPersistence;
        this.vocabularyPersistence = vocabularyPersistence;
        this.questionPersistence = questionPersistence;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("====== STARTING DATA SEEDER ======");
        try {
            // Only seed data if the database is completely empty
            if (languagePersistence.count() == 0) {
                System.out.println("Database is empty. Populating with Figma Mockup Data...");

                // 1. Seed Languages
                Language en = languagePersistence.save(new Language("en", "Tiếng Anh"));
                Language cn = languagePersistence.save(new Language("cn", "Tiếng Trung"));
                Language jp = languagePersistence.save(new Language("jp", "Tiếng Nhật"));

                // 2. Seed Topics (For English)
                Topic family = topicPersistence.save(new Topic(en.getId(), "Gia đình"));
                Topic animals = topicPersistence.save(new Topic(en.getId(), "Động vật"));
                Topic scenery = topicPersistence.save(new Topic(en.getId(), "Quan cảnh"));

                // 3. Seed Vocabularies (For Animals)
                vocabularyPersistence.save(new Vocabulary(animals.getId(), "Cat", "con mèo", "n", null, null));
                vocabularyPersistence.save(new Vocabulary(animals.getId(), "Dog", "con chó", "n", null, null));
                vocabularyPersistence.save(new Vocabulary(animals.getId(), "Fish", "con cá", "n", null, null));
                vocabularyPersistence.save(new Vocabulary(animals.getId(), "Pig", "con lợn", "n", null, null));

                // 4. Seed Questions (For Animals)
                questionPersistence.save(new Question(
                        animals.getId(),
                        "Cat nghĩa là?",
                        Arrays.asList("Mèo", "Chó", "Cá", "Bò"),
                        0, // Index 0 represents "Mèo"
                        null
                ));

                questionPersistence.save(new Question(
                        animals.getId(),
                        "Con mèo là?",
                        Arrays.asList("Cat", "Dog", "Fish", "Pig"),
                        0, // Index 0 represents "Cat"
                        "https://mockup-image-url.com/cute-cat.png" // Simulated image URL from PracticePage
                ));

                System.out.println("Mockup Data successfully seeded!");
            } else {
                System.out.println("Database already contains data. Skipping Seeder.");
            }
        } catch (Exception e) {
            System.err.println("====== DATA SEEDER ERROR ======");
            System.err.println("ERROR: Failed to connect to MongoDB or seed data.");
            System.err.println("Message: " + e.getMessage());
            System.err.println("The backend will continue running without seeded data.");
            System.err.println("Seeding can be retried once MongoDB is available.");
            System.err.println("==================================");
        }
    }
}
