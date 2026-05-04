package com.mobiledev.SEdu.persistence;

import com.mobiledev.SEdu.domain.Vocabulary;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VocabularyPersistence extends MongoRepository<Vocabulary, String> {
    List<Vocabulary> findByTopicId(String topicId);
}
