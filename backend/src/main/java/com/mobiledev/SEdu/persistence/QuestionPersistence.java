package com.mobiledev.SEdu.persistence;

import com.mobiledev.SEdu.domain.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionPersistence extends MongoRepository<Question, String> {
    List<Question> findByTopicId(String topicId);
}
