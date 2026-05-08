package com.mobiledev.SEdu.assessment.service;

import com.mobiledev.SEdu.assessment.model.TestResult;
import com.mobiledev.SEdu.assessment.repository.TestResultRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TestResultService {
    private final TestResultRepository testResultRepository;

    public TestResultService(TestResultRepository testResultRepository) { this.testResultRepository = testResultRepository; }

    public TestResult saveTestResult(TestResult testResult) {
        if (testResult.getTotalQuestions() > 0) {
            testResult.setPercentage(((double) testResult.getScore() / testResult.getTotalQuestions()) * 100);
        }
        return testResultRepository.save(testResult);
    }

    public List<TestResult> getHistoryByDevice(String deviceId) {
        return testResultRepository.findByDeviceIdOrderByCompletedAtDesc(deviceId);
    }
}
