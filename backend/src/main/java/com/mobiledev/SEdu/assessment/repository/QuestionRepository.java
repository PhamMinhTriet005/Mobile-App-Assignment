package com.mobiledev.SEdu.assessment.repository;

import com.mobiledev.SEdu.assessment.model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
    List<Question> findByTopicId(String topicId);
}
