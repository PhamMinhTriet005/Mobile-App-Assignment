package com.mobiledev.SEdu.assessment.repository;

import com.mobiledev.SEdu.assessment.model.TestResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TestResultRepository extends MongoRepository<TestResult, String> {
    List<TestResult> findByDeviceIdOrderByCompletedAtDesc(String deviceId);
}
