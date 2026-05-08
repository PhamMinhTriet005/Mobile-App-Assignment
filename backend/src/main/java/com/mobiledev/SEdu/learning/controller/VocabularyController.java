package com.mobiledev.SEdu.learning.controller;

import com.mobiledev.SEdu.learning.model.Vocabulary;
import com.mobiledev.SEdu.learning.service.VocabularyService;
import com.mobiledev.SEdu.shared.dto.ApiResponse;
import com.mobiledev.SEdu.shared.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vocabularies")
public class VocabularyController {
    private final VocabularyService vocabularyService;

    public VocabularyController(VocabularyService vocabularyService) { this.vocabularyService = vocabularyService; }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Vocabulary>>> getAllVocabularies() {
        return ResponseEntity.ok(ApiResponse.success("Success", vocabularyService.getAllVocabularies()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Vocabulary>> getVocabularyById(@PathVariable String id) {
        return vocabularyService.getVocabularyById(id)
                .map(vocab -> ResponseEntity.ok(ApiResponse.success("Vocabulary found", vocab)))
                .orElseThrow(() -> new ResourceNotFoundException("Vocabulary not found with id: " + id));
    }

    @GetMapping("/topic/{topicId}")
    public ResponseEntity<ApiResponse<List<Vocabulary>>> getVocabulariesByTopicId(@PathVariable String topicId) {
        return ResponseEntity.ok(ApiResponse.success("Success", vocabularyService.getVocabulariesByTopicId(topicId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Vocabulary>> createVocabulary(@RequestBody Vocabulary vocabulary) {
        Vocabulary created = vocabularyService.createVocabulary(vocabulary);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Vocabulary created successfully", created));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteVocabulary(@PathVariable String id) {
        vocabularyService.deleteVocabulary(id);
        return ResponseEntity.ok(ApiResponse.success("Vocabulary deleted successfully", null));
    }
}
