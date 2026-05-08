package com.mobiledev.SEdu.assessment.controller;

import com.mobiledev.SEdu.assessment.model.TestResult;
import com.mobiledev.SEdu.assessment.service.TestResultService;
import com.mobiledev.SEdu.shared.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/test-results")
public class TestResultController {
    private final TestResultService testResultService;

    public TestResultController(TestResultService testResultService) { this.testResultService = testResultService; }

    @PostMapping
    public ResponseEntity<ApiResponse<TestResult>> submitTestResult(@RequestBody TestResult result) {
        TestResult saved = testResultService.saveTestResult(result);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Test result saved successfully", saved));
    }

    @GetMapping("/device/{deviceId}")
    public ResponseEntity<ApiResponse<List<TestResult>>> getTestHistory(@PathVariable String deviceId) {
        return ResponseEntity.ok(ApiResponse.success("Success", testResultService.getHistoryByDevice(deviceId)));
    }
}
