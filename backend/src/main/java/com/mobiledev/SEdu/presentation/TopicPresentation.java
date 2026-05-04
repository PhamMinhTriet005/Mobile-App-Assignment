package com.mobiledev.SEdu.presentation;

import com.mobiledev.SEdu.business.TopicBusiness;
import com.mobiledev.SEdu.business.exception.ResourceNotFoundException;
import com.mobiledev.SEdu.domain.Topic;
import com.mobiledev.SEdu.presentation.payload.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
public class TopicPresentation {

    private final TopicBusiness topicBusiness;

    public TopicPresentation(TopicBusiness topicBusiness) {
        this.topicBusiness = topicBusiness;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Topic>>> getAllTopics() {
        return ResponseEntity.ok(ApiResponse.success("Success", topicBusiness.getAllTopics()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Topic>> getTopicById(@PathVariable String id) {
        return topicBusiness.getTopicById(id)
                .map(topic -> ResponseEntity.ok(ApiResponse.success("Topic found", topic)))
                .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + id));
    }

    @GetMapping("/language/{languageId}")
    public ResponseEntity<ApiResponse<List<Topic>>> getTopicsByLanguageId(@PathVariable String languageId) {
        return ResponseEntity.ok(ApiResponse.success("Success", topicBusiness.getTopicsByLanguageId(languageId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Topic>> createTopic(@RequestBody Topic topic) {
        Topic createdTopic = topicBusiness.createTopic(topic);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Topic created successfully", createdTopic));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTopic(@PathVariable String id) {
        topicBusiness.deleteTopic(id);
        return ResponseEntity.ok(ApiResponse.success("Topic deleted successfully", null));
    }
}
