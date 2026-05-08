package com.mobiledev.SEdu.assessment.ai;

import com.mobiledev.SEdu.assessment.dto.AssessmentResult;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service("googleSpeechService")
public class GooglePronunciationServiceImpl implements PronunciationAssessmentService {
    @Override
    public AssessmentResult assessPronunciation(MultipartFile audioFile, String referenceText) {
        System.out.println("Processing audio with Google Cloud Speech API...");
        return new AssessmentResult(75.0, 80.0, 70.0, 100.0, referenceText);
    }
    @Override public String getProviderName() { return "GOOGLE"; }
}
