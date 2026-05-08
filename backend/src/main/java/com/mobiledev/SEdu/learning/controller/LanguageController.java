package com.mobiledev.SEdu.learning.controller;

import com.mobiledev.SEdu.learning.model.Language;
import com.mobiledev.SEdu.learning.service.LanguageService;
import com.mobiledev.SEdu.shared.dto.ApiResponse;
import com.mobiledev.SEdu.shared.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/languages")
public class LanguageController {
    private final LanguageService languageService;

    public LanguageController(LanguageService languageService) { this.languageService = languageService; }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Language>>> getAllLanguages() {
        return ResponseEntity.ok(ApiResponse.success("Languages retrieved successfully", languageService.getAllLanguages()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Language>> getLanguageById(@PathVariable String id) {
        return languageService.getLanguageById(id)
                .map(lang -> ResponseEntity.ok(ApiResponse.success("Language found", lang)))
                .orElseThrow(() -> new ResourceNotFoundException("Language not found with id: " + id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Language>> createLanguage(@RequestBody Language language) {
        Language created = languageService.createLanguage(language);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Language created successfully", created));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteLanguage(@PathVariable String id) {
        languageService.deleteLanguage(id);
        return ResponseEntity.ok(ApiResponse.success("Language deleted successfully", null));
    }
}
