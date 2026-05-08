package com.mobiledev.SEdu.learning.repository;

import com.mobiledev.SEdu.learning.model.Vocabulary;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VocabularyRepository extends MongoRepository<Vocabulary, String> {
    List<Vocabulary> findByTopicId(String topicId);
}
