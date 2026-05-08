package com.mobiledev.SEdu.assessment.service;

import com.mobiledev.SEdu.assessment.model.Question;
import com.mobiledev.SEdu.assessment.repository.QuestionRepository;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) { this.questionRepository = questionRepository; }

    public List<Question> getAllQuestions() { return questionRepository.findAll(); }
    public Optional<Question> getQuestionById(String id) { return questionRepository.findById(id); }
    public List<Question> getQuestionsByTopicId(String topicId) { return questionRepository.findByTopicId(topicId); }

    public List<Question> generateTestForTopic(String topicId, int numberOfQuestions) {
        List<Question> allQuestionsForTopic = questionRepository.findByTopicId(topicId);
        Collections.shuffle(allQuestionsForTopic);
        return allQuestionsForTopic.stream().limit(numberOfQuestions).collect(Collectors.toList());
    }

    public Question createQuestion(Question question) { return questionRepository.save(question); }
    public void deleteQuestion(String id) { questionRepository.deleteById(id); }
}
