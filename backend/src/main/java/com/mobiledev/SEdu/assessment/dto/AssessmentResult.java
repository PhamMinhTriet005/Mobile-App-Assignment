package com.mobiledev.SEdu.assessment.dto;

public class AssessmentResult {
    private double pronunciationScore;
    private double accuracyScore;
    private double fluencyScore;
    private double completenessScore;
    private String recognizedText;

    public AssessmentResult(double pronunciationScore, double accuracyScore, double fluencyScore, double completenessScore, String recognizedText) {
        this.pronunciationScore = pronunciationScore; this.accuracyScore = accuracyScore;
        this.fluencyScore = fluencyScore; this.completenessScore = completenessScore; this.recognizedText = recognizedText;
    }

    public double getPronunciationScore() { return pronunciationScore; }
    public void setPronunciationScore(double v) { this.pronunciationScore = v; }
    public double getAccuracyScore() { return accuracyScore; }
    public void setAccuracyScore(double v) { this.accuracyScore = v; }
    public double getFluencyScore() { return fluencyScore; }
    public void setFluencyScore(double v) { this.fluencyScore = v; }
    public double getCompletenessScore() { return completenessScore; }
    public void setCompletenessScore(double v) { this.completenessScore = v; }
    public String getRecognizedText() { return recognizedText; }
    public void setRecognizedText(String v) { this.recognizedText = v; }
}
