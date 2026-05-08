package com.mobiledev.SEdu.learning.repository;

import com.mobiledev.SEdu.learning.model.Topic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TopicRepository extends MongoRepository<Topic, String> {
    List<Topic> findByLanguageId(String languageId);
}
