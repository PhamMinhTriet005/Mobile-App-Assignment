package com.mobiledev.SEdu.assessment.controller;

import com.mobiledev.SEdu.assessment.dto.TestGenerationRequest;
import com.mobiledev.SEdu.assessment.model.Question;
import com.mobiledev.SEdu.assessment.model.TestResult;
import com.mobiledev.SEdu.assessment.service.QuestionService;
import com.mobiledev.SEdu.assessment.service.TestResultService;
import com.mobiledev.SEdu.shared.dto.ApiResponse;
import com.mobiledev.SEdu.shared.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {
    private final QuestionService questionService;
    private final TestResultService testResultService;

    public QuestionController(QuestionService questionService, TestResultService testResultService) {
        this.questionService = questionService; this.testResultService = testResultService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Question>>> getAllQuestions() {
        return ResponseEntity.ok(ApiResponse.success("Success", questionService.getAllQuestions()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Question>> getQuestionById(@PathVariable String id) {
        return questionService.getQuestionById(id)
                .map(q -> ResponseEntity.ok(ApiResponse.success("Question found", q)))
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + id));
    }

    @GetMapping("/topic/{topicId}")
    public ResponseEntity<ApiResponse<List<Question>>> getQuestionsByTopicId(@PathVariable String topicId) {
        return ResponseEntity.ok(ApiResponse.success("Success", questionService.getQuestionsByTopicId(topicId)));
    }

    @PostMapping("/generate-test")
    public ResponseEntity<ApiResponse<List<Question>>> generateTest(@RequestBody TestGenerationRequest request) {
        List<Question> testQuestions = questionService.generateTestForTopic(request.getTopicId(), request.getNumberOfQuestions());
        return ResponseEntity.ok(ApiResponse.success("Test generated successfully", testQuestions));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Question>> createQuestion(@RequestBody Question question) {
        Question created = questionService.createQuestion(question);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Created successfully", created));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteQuestion(@PathVariable String id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.ok(ApiResponse.success("Deleted successfully", null));
    }
}
