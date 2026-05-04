package com.mobiledev.SEdu.presentation;

import com.mobiledev.SEdu.business.QuestionBusiness;
import com.mobiledev.SEdu.domain.Question;
import com.mobiledev.SEdu.presentation.payload.ApiResponse;
import com.mobiledev.SEdu.presentation.payload.TestGenerationRequest;
import com.mobiledev.SEdu.business.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionPresentation {

    private final QuestionBusiness questionBusiness;

    public QuestionPresentation(QuestionBusiness questionBusiness) {
        this.questionBusiness = questionBusiness;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Question>>> getAllQuestions() {
        return ResponseEntity.ok(ApiResponse.success("Success", questionBusiness.getAllQuestions()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Question>> getQuestionById(@PathVariable String id) {
        return questionBusiness.getQuestionById(id)
                .map(q -> ResponseEntity.ok(ApiResponse.success("Question found", q)))
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + id));
    }

    @GetMapping("/topic/{topicId}")
    public ResponseEntity<ApiResponse<List<Question>>> getQuestionsByTopicId(@PathVariable String topicId) {
        return ResponseEntity.ok(ApiResponse.success("Success", questionBusiness.getQuestionsByTopicId(topicId)));
    }

    // Specific Endpoint for generating tests for the mobile app (e.g. 10 random questions)
    @PostMapping("/generate-test")
    public ResponseEntity<ApiResponse<List<Question>>> generateTest(@RequestBody TestGenerationRequest request) {
        List<Question> testQuestions = questionBusiness.generateTestForTopic(
                request.getTopicId(), 
                request.getNumberOfQuestions()
        );
        return ResponseEntity.ok(ApiResponse.success("Test generated successfully", testQuestions));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Question>> createQuestion(@RequestBody Question question) {
        Question createdQuestion = questionBusiness.createQuestion(question);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Created successfully", createdQuestion));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteQuestion(@PathVariable String id) {
        questionBusiness.deleteQuestion(id);
        return ResponseEntity.ok(ApiResponse.success("Deleted successfully", null));
    }
}
