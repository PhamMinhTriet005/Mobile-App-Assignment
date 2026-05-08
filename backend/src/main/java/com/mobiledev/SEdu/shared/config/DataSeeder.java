package com.mobiledev.SEdu.shared.config;

import com.mobiledev.SEdu.assessment.model.Question;
import com.mobiledev.SEdu.assessment.repository.QuestionRepository;
import com.mobiledev.SEdu.learning.model.Language;
import com.mobiledev.SEdu.learning.model.Topic;
import com.mobiledev.SEdu.learning.model.Vocabulary;
import com.mobiledev.SEdu.learning.repository.LanguageRepository;
import com.mobiledev.SEdu.learning.repository.TopicRepository;
import com.mobiledev.SEdu.learning.repository.VocabularyRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    private final LanguageRepository languageRepository;
    private final TopicRepository topicRepository;
    private final VocabularyRepository vocabularyRepository;
    private final QuestionRepository questionRepository;

    public DataSeeder(LanguageRepository languageRepository, TopicRepository topicRepository,
                      VocabularyRepository vocabularyRepository, QuestionRepository questionRepository) {
        this.languageRepository = languageRepository;
        this.topicRepository = topicRepository;
        this.vocabularyRepository = vocabularyRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("====== STARTING DATA SEEDER ======");
        try {
            if (languageRepository.count() == 0) {
                System.out.println("Database is empty. Populating with Figma Mockup Data...");

                Language en = languageRepository.save(new Language("en", "Tiếng Anh"));
                Language cn = languageRepository.save(new Language("cn", "Tiếng Trung"));
                Language jp = languageRepository.save(new Language("jp", "Tiếng Nhật"));

                Topic family = topicRepository.save(new Topic(en.getId(), "Gia đình"));
                Topic animals = topicRepository.save(new Topic(en.getId(), "Động vật"));
                Topic scenery = topicRepository.save(new Topic(en.getId(), "Quan cảnh"));

                vocabularyRepository.save(new Vocabulary(animals.getId(), "Cat", "con mèo", "n", null, null));
                vocabularyRepository.save(new Vocabulary(animals.getId(), "Dog", "con chó", "n", null, null));
                vocabularyRepository.save(new Vocabulary(animals.getId(), "Fish", "con cá", "n", null, null));
                vocabularyRepository.save(new Vocabulary(animals.getId(), "Pig", "con lợn", "n", null, null));

                questionRepository.save(new Question(animals.getId(), "Cat nghĩa là?",
                        Arrays.asList("Mèo", "Chó", "Cá", "Bò"), 0, null));
                questionRepository.save(new Question(animals.getId(), "Con mèo là?",
                        Arrays.asList("Cat", "Dog", "Fish", "Pig"), 0,
                        "https://mockup-image-url.com/cute-cat.png"));

                System.out.println("Mockup Data successfully seeded!");
            } else {
                System.out.println("Database already contains data. Skipping Seeder.");
            }
        } catch (Exception e) {
            System.err.println("====== DATA SEEDER ERROR ======");
            System.err.println("ERROR: Failed to connect to MongoDB or seed data.");
            System.err.println("Message: " + e.getMessage());
            System.err.println("The backend will continue running without seeded data.");
            System.err.println("==================================");
        }
    }
}
