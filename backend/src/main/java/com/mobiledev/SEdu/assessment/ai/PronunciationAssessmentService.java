package com.mobiledev.SEdu.assessment.ai;

import com.mobiledev.SEdu.assessment.dto.AssessmentResult;
import org.springframework.web.multipart.MultipartFile;

public interface PronunciationAssessmentService {
    AssessmentResult assessPronunciation(MultipartFile audioFile, String referenceText);
    String getProviderName();
}
