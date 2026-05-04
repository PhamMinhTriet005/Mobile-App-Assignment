package com.mobiledev.SEdu.presentation;

import com.mobiledev.SEdu.business.VocabularyBusiness;
import com.mobiledev.SEdu.business.exception.ResourceNotFoundException;
import com.mobiledev.SEdu.domain.Vocabulary;
import com.mobiledev.SEdu.presentation.payload.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vocabularies")
public class VocabularyPresentation {

    private final VocabularyBusiness vocabularyBusiness;

    public VocabularyPresentation(VocabularyBusiness vocabularyBusiness) {
        this.vocabularyBusiness = vocabularyBusiness;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Vocabulary>>> getAllVocabularies() {
        return ResponseEntity.ok(ApiResponse.success("Success", vocabularyBusiness.getAllVocabularies()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Vocabulary>> getVocabularyById(@PathVariable String id) {
        return vocabularyBusiness.getVocabularyById(id)
                .map(vocab -> ResponseEntity.ok(ApiResponse.success("Vocabulary found", vocab)))
                .orElseThrow(() -> new ResourceNotFoundException("Vocabulary not found with id: " + id));
    }

    @GetMapping("/topic/{topicId}")
    public ResponseEntity<ApiResponse<List<Vocabulary>>> getVocabulariesByTopicId(@PathVariable String topicId) {
        return ResponseEntity.ok(ApiResponse.success("Success", vocabularyBusiness.getVocabulariesByTopicId(topicId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Vocabulary>> createVocabulary(@RequestBody Vocabulary vocabulary) {
        Vocabulary createdVocabulary = vocabularyBusiness.createVocabulary(vocabulary);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Vocabulary created successfully", createdVocabulary));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteVocabulary(@PathVariable String id) {
        vocabularyBusiness.deleteVocabulary(id);
        return ResponseEntity.ok(ApiResponse.success("Vocabulary deleted successfully", null));
    }
}
