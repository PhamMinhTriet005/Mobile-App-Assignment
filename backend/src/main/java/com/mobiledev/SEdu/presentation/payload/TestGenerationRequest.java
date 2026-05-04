package com.mobiledev.SEdu.presentation.payload;


public class TestGenerationRequest {
    private String topicId;
    private int numberOfQuestions = 10; // Default to 10 questions for a test

    public String getTopicId() {
        return topicId;
    }

    public void setTopicId(String topicId) {
        this.topicId = topicId;
    }

    public int getNumberOfQuestions() {
        return numberOfQuestions;
    }

    public void setNumberOfQuestions(int numberOfQuestions) {
        this.numberOfQuestions = numberOfQuestions;
    }
}
