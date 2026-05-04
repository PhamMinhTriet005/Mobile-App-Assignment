package com.mobiledev.SEdu.persistence;

import com.mobiledev.SEdu.domain.TestResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestResultPersistence extends MongoRepository<TestResult, String> {
    List<TestResult> findByDeviceIdOrderByCompletedAtDesc(String deviceId);
}
