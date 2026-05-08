package com.mobiledev.SEdu.assessment.dto;

import jakarta.validation.constraints.NotBlank;

public class TextEvaluationRequest {
    @NotBlank private String recognizedText;
    @NotBlank private String referenceText;

    public String getRecognizedText() { return recognizedText; }
    public void setRecognizedText(String v) { this.recognizedText = v; }
    public String getReferenceText() { return referenceText; }
    public void setReferenceText(String v) { this.referenceText = v; }
}
