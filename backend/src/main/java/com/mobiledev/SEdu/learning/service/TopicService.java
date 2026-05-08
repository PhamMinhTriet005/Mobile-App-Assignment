package com.mobiledev.SEdu.learning.service;

import com.mobiledev.SEdu.learning.model.Topic;
import com.mobiledev.SEdu.learning.repository.TopicRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TopicService {
    private final TopicRepository topicRepository;

    public TopicService(TopicRepository topicRepository) { this.topicRepository = topicRepository; }

    public List<Topic> getAllTopics() { return topicRepository.findAll(); }
    public Optional<Topic> getTopicById(String id) { return topicRepository.findById(id); }
    public List<Topic> getTopicsByLanguageId(String languageId) { return topicRepository.findByLanguageId(languageId); }
    public Topic createTopic(Topic topic) { return topicRepository.save(topic); }
    public void deleteTopic(String id) { topicRepository.deleteById(id); }
}
