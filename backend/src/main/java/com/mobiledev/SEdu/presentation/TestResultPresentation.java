package com.mobiledev.SEdu.presentation;

import com.mobiledev.SEdu.business.TestResultBusiness;
import com.mobiledev.SEdu.domain.TestResult;
import com.mobiledev.SEdu.presentation.payload.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test-results")
public class TestResultPresentation {

    private final TestResultBusiness testResultBusiness;

    public TestResultPresentation(TestResultBusiness testResultBusiness) {
        this.testResultBusiness = testResultBusiness;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TestResult>> submitTestResult(@RequestBody TestResult result) {
        TestResult savedResult = testResultBusiness.saveTestResult(result);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Test result saved successfully", savedResult));
    }

    @GetMapping("/device/{deviceId}")
    public ResponseEntity<ApiResponse<List<TestResult>>> getTestHistory(@PathVariable String deviceId) {
        List<TestResult> history = testResultBusiness.getHistoryByDevice(deviceId);
        return ResponseEntity.ok(ApiResponse.success("Success", history));
    }
}
