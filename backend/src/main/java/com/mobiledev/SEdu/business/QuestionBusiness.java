package com.mobiledev.SEdu.business;

import com.mobiledev.SEdu.domain.Question;
import com.mobiledev.SEdu.persistence.QuestionPersistence;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionBusiness {

    private final QuestionPersistence questionPersistence;

    public QuestionBusiness(QuestionPersistence questionPersistence) {
        this.questionPersistence = questionPersistence;
    }

    public List<Question> getAllQuestions() {
        return questionPersistence.findAll();
    }

    public Optional<Question> getQuestionById(String id) {
        return questionPersistence.findById(id);
    }

    public List<Question> getQuestionsByTopicId(String topicId) {
        return questionPersistence.findByTopicId(topicId);
    }

    // specific method for building tests dynamically for the mobile app
    public List<Question> generateTestForTopic(String topicId, int numberOfQuestions) {
        List<Question> allQuestionsForTopic = questionPersistence.findByTopicId(topicId);
        
        // Shuffle the questions to give a different test each time
        Collections.shuffle(allQuestionsForTopic);
        
        // Return only the requested number of questions (e.g., 10)
        return allQuestionsForTopic.stream()
                .limit(numberOfQuestions)
                .collect(Collectors.toList());
    }

    public Question createQuestion(Question question) {
        return questionPersistence.save(question);
    }

    public void deleteQuestion(String id) {
        questionPersistence.deleteById(id);
    }
}
