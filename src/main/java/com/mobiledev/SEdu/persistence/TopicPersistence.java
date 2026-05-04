package com.mobiledev.SEdu.persistence;

import com.mobiledev.SEdu.domain.Topic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicPersistence extends MongoRepository<Topic, String> {
    List<Topic> findByLanguageId(String languageId);
}
