package com.mobiledev.SEdu.assessment.controller;

import com.mobiledev.SEdu.assessment.ai.PronunciationAssessmentService;
import com.mobiledev.SEdu.assessment.ai.PronunciationProviderFactory;
import com.mobiledev.SEdu.assessment.dto.AssessmentResult;
import com.mobiledev.SEdu.assessment.dto.TextEvaluationRequest;
import com.mobiledev.SEdu.assessment.service.TextEvaluationService;
import com.mobiledev.SEdu.shared.dto.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/ai/pronunciation")
public class PronunciationController {

    private final PronunciationProviderFactory providerFactory;
    private final TextEvaluationService textEvaluationService;

    public PronunciationController(PronunciationProviderFactory providerFactory, TextEvaluationService textEvaluationService) {
        this.providerFactory = providerFactory;
        this.textEvaluationService = textEvaluationService;
    }

    @PostMapping("/assess")
    public ResponseEntity<ApiResponse<AssessmentResult>> assessPronunciation(
            @RequestParam("audio") MultipartFile audioFile,
            @RequestParam("referenceText") String referenceText) {
        PronunciationAssessmentService aiService = providerFactory.getActiveService();
        AssessmentResult result = aiService.assessPronunciation(audioFile, referenceText);
        return ResponseEntity.ok(new ApiResponse<>(true, "Pronunciation analyzed successfully using " + aiService.getProviderName(), result));
    }

    @PostMapping("/evaluate-text")
    public ResponseEntity<ApiResponse<AssessmentResult>> evaluateRecognizedText(
            @Valid @RequestBody TextEvaluationRequest request) {
        double score = textEvaluationService.evaluateSimilarity(request.getRecognizedText(), request.getReferenceText());
        AssessmentResult result = new AssessmentResult(score, score, score, 100.0, request.getRecognizedText());
        return ResponseEntity.ok(new ApiResponse<>(true, "Text evaluated successfully", result));
    }
}
