package com.mobiledev.SEdu.presentation;

import com.mobiledev.SEdu.business.LanguageBusiness;
import com.mobiledev.SEdu.domain.Language;
import com.mobiledev.SEdu.presentation.payload.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/languages")
public class LanguagePresentation {

    private final LanguageBusiness languageBusiness;

    public LanguagePresentation(LanguageBusiness languageBusiness) {
        this.languageBusiness = languageBusiness;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Language>>> getAllLanguages() {
        List<Language> languages = languageBusiness.getAllLanguages();
        return ResponseEntity.ok(ApiResponse.success("Languages retrieved successfully", languages));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Language>> getLanguageById(@PathVariable String id) {
        return languageBusiness.getLanguageById(id)
                .map(lang -> ResponseEntity.ok(ApiResponse.success("Language found", lang)))
                .orElseThrow(() -> new com.mobiledev.SEdu.business.exception.ResourceNotFoundException("Language not found with id: " + id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Language>> createLanguage(@RequestBody Language language) {
        Language createdLanguage = languageBusiness.createLanguage(language);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Language created successfully", createdLanguage));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteLanguage(@PathVariable String id) {
        languageBusiness.deleteLanguage(id);
        return ResponseEntity.ok(ApiResponse.success("Language deleted successfully", null));
    }
}
