package com.mobiledev.SEdu.business;

import com.mobiledev.SEdu.domain.TestResult;
import com.mobiledev.SEdu.persistence.TestResultPersistence;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestResultBusiness {

    private final TestResultPersistence testResultPersistence;

    public TestResultBusiness(TestResultPersistence testResultPersistence) {
        this.testResultPersistence = testResultPersistence;
    }

    public TestResult saveTestResult(TestResult testResult) {
        // Recalculate percentage just in case it was missed
        if (testResult.getTotalQuestions() > 0) {
            testResult.setPercentage(((double) testResult.getScore() / testResult.getTotalQuestions()) * 100);
        }
        return testResultPersistence.save(testResult);
    }

    public List<TestResult> getHistoryByDevice(String deviceId) {
        return testResultPersistence.findByDeviceIdOrderByCompletedAtDesc(deviceId);
    }
}
