package com.mobiledev.SEdu.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "test_results")
public class TestResult {
    
    @Id
    private String id;
    private String deviceId; // Allows tracking without an auth server for now
    private String topicId;
    private int score;
    private int totalQuestions;
    private double percentage;
    private LocalDateTime completedAt;

    public TestResult() {
        this.completedAt = LocalDateTime.now();
    }

    public TestResult(String deviceId, String topicId, int score, int totalQuestions) {
        this();
        this.deviceId = deviceId;
        this.topicId = topicId;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.percentage = totalQuestions > 0 ? ((double) score / totalQuestions) * 100 : 0;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getTopicId() {
        return topicId;
    }

    public void setTopicId(String topicId) {
        this.topicId = topicId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }
}
