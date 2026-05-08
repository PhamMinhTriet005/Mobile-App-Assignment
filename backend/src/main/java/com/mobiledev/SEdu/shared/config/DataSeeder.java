package com.mobiledev.SEdu.shared.config;

import com.mobiledev.SEdu.assessment.model.Question;
import com.mobiledev.SEdu.assessment.repository.QuestionRepository;
import com.mobiledev.SEdu.learning.model.Language;
import com.mobiledev.SEdu.learning.model.Topic;
import com.mobiledev.SEdu.learning.model.Vocabulary;
import com.mobiledev.SEdu.learning.repository.LanguageRepository;
import com.mobiledev.SEdu.learning.repository.TopicRepository;
import com.mobiledev.SEdu.learning.repository.VocabularyRepository;
import com.mobiledev.SEdu.subscription.model.Subscription;
import com.mobiledev.SEdu.subscription.model.SubscriptionPlan;
import com.mobiledev.SEdu.subscription.model.PaymentMethod;
import com.mobiledev.SEdu.subscription.repository.SubscriptionRepository;
import com.mobiledev.SEdu.auth.model.User;
import com.mobiledev.SEdu.auth.model.Role;
import com.mobiledev.SEdu.auth.model.AuthProvider;
import com.mobiledev.SEdu.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    private final LanguageRepository languageRepository;
    private final TopicRepository topicRepository;
    private final VocabularyRepository vocabularyRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    public DataSeeder(LanguageRepository languageRepository, TopicRepository topicRepository,
                      VocabularyRepository vocabularyRepository, QuestionRepository questionRepository,
                      UserRepository userRepository, SubscriptionRepository subscriptionRepository,
                      org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        this.languageRepository = languageRepository;
        this.topicRepository = topicRepository;
        this.vocabularyRepository = vocabularyRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("====== STARTING DATA SEEDER ======");
        try {
            if (languageRepository.count() == 0) {
                System.out.println("Database is empty. Populating with comprehensive Mockup Data...");

                // --- Languages ---
                Language en = languageRepository.save(new Language("en", "English"));
                Language cn = languageRepository.save(new Language("cn", "Chinese"));
                Language jp = languageRepository.save(new Language("jp", "Japanese"));

                // --- English Topics & Data ---
                // Topic: Animals
                Topic animals = topicRepository.save(new Topic(en.getId(), "Animals"));
                vocabularyRepository.save(new Vocabulary(animals.getId(), "Cat", "Con mèo", "n", "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba", null));
                vocabularyRepository.save(new Vocabulary(animals.getId(), "Dog", "Con chó", "n", "https://images.unsplash.com/photo-1517841905240-472988babdf9", null));
                vocabularyRepository.save(new Vocabulary(animals.getId(), "Elephant", "Con voi", "n", "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46", null));
                vocabularyRepository.save(new Vocabulary(animals.getId(), "Lion", "Sư tử", "n", "https://images.unsplash.com/photo-1546182990-dffeafbe841d", null));
                vocabularyRepository.save(new Vocabulary(animals.getId(), "Monkey", "Con khỉ", "n", "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9", null));
                vocabularyRepository.save(new Vocabulary(animals.getId(), "Tiger", "Con hổ", "n", null, null));
                vocabularyRepository.save(new Vocabulary(animals.getId(), "Giraffe", "Hươu cao cổ", "n", null, null));

                questionRepository.save(new Question(animals.getId(), "What is 'Cat' in Vietnamese?",
                        Arrays.asList("Mèo", "Chó", "Cá", "Lợn"), 0, null));
                questionRepository.save(new Question(animals.getId(), "Which animal is 'Dog'?",
                        Arrays.asList("Cat", "Dog", "Fish", "Pig"), 1, null));

                // Topic: Family
                Topic family = topicRepository.save(new Topic(en.getId(), "Family"));
                vocabularyRepository.save(new Vocabulary(family.getId(), "Father", "Bố", "n", null, null));
                vocabularyRepository.save(new Vocabulary(family.getId(), "Mother", "Mẹ", "n", null, null));
                vocabularyRepository.save(new Vocabulary(family.getId(), "Brother", "Anh/Em trai", "n", null, null));
                vocabularyRepository.save(new Vocabulary(family.getId(), "Sister", "Chị/Em gái", "n", null, null));
                vocabularyRepository.save(new Vocabulary(family.getId(), "Grandfather", "Ông", "n", null, null));
                vocabularyRepository.save(new Vocabulary(family.getId(), "Grandmother", "Bà", "n", null, null));

                questionRepository.save(new Question(family.getId(), "Who is your 'Father'?",
                        Arrays.asList("Mẹ", "Bố", "Anh trai", "Chị gái"), 1, null));

                // Topic: Food
                Topic food = topicRepository.save(new Topic(en.getId(), "Food"));
                vocabularyRepository.save(new Vocabulary(food.getId(), "Bread", "Bánh mì", "n", null, null));
                vocabularyRepository.save(new Vocabulary(food.getId(), "Milk", "Sữa", "n", null, null));
                vocabularyRepository.save(new Vocabulary(food.getId(), "Rice", "Cơm", "n", null, null));

                // --- Chinese Topics & Data ---
                // Topic: Greetings
                Topic cnGreetings = topicRepository.save(new Topic(cn.getId(), "Greetings (问候)"));
                vocabularyRepository.save(new Vocabulary(cnGreetings.getId(), "Nǐ hǎo", "Xin chào", "v", null, null));
                vocabularyRepository.save(new Vocabulary(cnGreetings.getId(), "Xièxiè", "Cảm ơn", "v", null, null));
                vocabularyRepository.save(new Vocabulary(cnGreetings.getId(), "Zàijiàn", "Tạm biệt", "v", null, null));

                questionRepository.save(new Question(cnGreetings.getId(), "'Nǐ hǎo' means?",
                        Arrays.asList("Cảm ơn", "Xin chào", "Tạm biệt", "Xin lỗi"), 1, null));

                // Topic: Numbers
                Topic cnNumbers = topicRepository.save(new Topic(cn.getId(), "Numbers (数字)"));
                vocabularyRepository.save(new Vocabulary(cnNumbers.getId(), "Yī", "Một", "n", null, null));
                vocabularyRepository.save(new Vocabulary(cnNumbers.getId(), "Èr", "Hai", "n", null, null));
                vocabularyRepository.save(new Vocabulary(cnNumbers.getId(), "Sān", "Ba", "n", null, null));
                vocabularyRepository.save(new Vocabulary(cnNumbers.getId(), "Sì", "Bốn", "n", null, null));
                vocabularyRepository.save(new Vocabulary(cnNumbers.getId(), "Wǔ", "Năm", "n", null, null));

                // --- Japanese Topics & Data ---
                // Topic: Basic Phrases
                Topic jpPhrases = topicRepository.save(new Topic(jp.getId(), "Basic Phrases (基本フレーズ)"));
                vocabularyRepository.save(new Vocabulary(jpPhrases.getId(), "Konnichiwa", "Xin chào", "v", null, null));
                vocabularyRepository.save(new Vocabulary(jpPhrases.getId(), "Arigatou", "Cảm ơn", "v", null, null));
                vocabularyRepository.save(new Vocabulary(jpPhrases.getId(), "Sayounara", "Tạm biệt", "v", null, null));

                questionRepository.save(new Question(jpPhrases.getId(), "How do you say 'Thank you' in Japanese?",
                        Arrays.asList("Konnichiwa", "Arigatou", "Sayounara", "Sumimasen"), 1, null));

                // --- Users & Subscriptions ---
                if (userRepository.count() == 0) {
                    System.out.println("Seeding default users and subscriptions...");
                    User admin = userRepository.save(new User("admin", "admin@sedu.com", passwordEncoder.encode("admin123"), Role.ADMIN, AuthProvider.LOCAL));
                    User user = userRepository.save(new User("user", "user@sedu.com", passwordEncoder.encode("user123"), Role.USER, AuthProvider.LOCAL));
                    
                    // Seed a premium subscription for 'user'
                    subscriptionRepository.save(new Subscription(
                            user.getId(),
                            SubscriptionPlan.PREMIUM_YEARLY,
                            PaymentMethod.PAYPAL,
                            "TXN-" + System.currentTimeMillis(),
                            SubscriptionPlan.PREMIUM_YEARLY.getPriceVND(),
                            java.time.Instant.now(),
                            java.time.Instant.now().plus(java.time.Duration.ofDays(365))
                    ));

                    System.out.println("Default users seeded: admin/admin123, user/user123 (Premium)");
                }

                System.out.println("Comprehensive Mockup Data successfully seeded!");
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
