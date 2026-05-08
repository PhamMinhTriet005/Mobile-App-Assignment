package com.mobiledev.SEdu.learning.controller;

import com.mobiledev.SEdu.learning.model.Topic;
import com.mobiledev.SEdu.learning.service.TopicService;
import com.mobiledev.SEdu.shared.dto.ApiResponse;
import com.mobiledev.SEdu.shared.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/topics")
public class TopicController {
    private final TopicService topicService;

    public TopicController(TopicService topicService) { this.topicService = topicService; }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Topic>>> getAllTopics() {
        return ResponseEntity.ok(ApiResponse.success("Success", topicService.getAllTopics()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Topic>> getTopicById(@PathVariable String id) {
        return topicService.getTopicById(id)
                .map(topic -> ResponseEntity.ok(ApiResponse.success("Topic found", topic)))
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + id));
    }

    @GetMapping("/language/{languageId}")
    public ResponseEntity<ApiResponse<List<Topic>>> getTopicsByLanguageId(@PathVariable String languageId) {
        return ResponseEntity.ok(ApiResponse.success("Success", topicService.getTopicsByLanguageId(languageId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Topic>> createTopic(@RequestBody Topic topic) {
        Topic created = topicService.createTopic(topic);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Topic created successfully", created));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTopic(@PathVariable String id) {
        topicService.deleteTopic(id);
        return ResponseEntity.ok(ApiResponse.success("Topic deleted successfully", null));
    }
}
