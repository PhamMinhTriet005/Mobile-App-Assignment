package com.mobiledev.SEdu.business;

import com.mobiledev.SEdu.domain.Topic;
import com.mobiledev.SEdu.persistence.TopicPersistence;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopicBusiness {

    private final TopicPersistence topicPersistence;

    public TopicBusiness(TopicPersistence topicPersistence) {
        this.topicPersistence = topicPersistence;
    }

    public List<Topic> getAllTopics() {
        return topicPersistence.findAll();
    }

    public Optional<Topic> getTopicById(String id) {
        return topicPersistence.findById(id);
    }

    public List<Topic> getTopicsByLanguageId(String languageId) {
        return topicPersistence.findByLanguageId(languageId);
    }

    public Topic createTopic(Topic topic) {
        return topicPersistence.save(topic);
    }

    public void deleteTopic(String id) {
        topicPersistence.deleteById(id);
    }
}
