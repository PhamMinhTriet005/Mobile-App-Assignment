package com.mobiledev.SEdu.assessment.ai;

import com.microsoft.cognitiveservices.speech.*;
import com.microsoft.cognitiveservices.speech.audio.AudioConfig;
import com.mobiledev.SEdu.assessment.dto.AssessmentResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;

@Service("azureSpeechService")
public class AzurePronunciationServiceImpl implements PronunciationAssessmentService {
    @Value("${app.ai.azure.key}") private String azureKey;
    @Value("${app.ai.azure.region}") private String azureRegion;

    @Override
    public AssessmentResult assessPronunciation(MultipartFile audioFile, String referenceText) {
        if (azureKey == null || azureKey.isEmpty() || azureKey.contains("your_azure")) {
            throw new RuntimeException("Azure Speech API Key is not configured.");
        }
        File tempFile = null;
        try {
            tempFile = File.createTempFile("audio", ".wav");
            audioFile.transferTo(tempFile);
            SpeechConfig speechConfig = SpeechConfig.fromSubscription(azureKey, azureRegion);
            AudioConfig audioConfig = AudioConfig.fromWavFileInput(tempFile.getAbsolutePath());
            try (SpeechRecognizer recognizer = new SpeechRecognizer(speechConfig, audioConfig)) {
                PronunciationAssessmentConfig pronConfig = new PronunciationAssessmentConfig(
                        referenceText, PronunciationAssessmentGradingSystem.HundredMark,
                        PronunciationAssessmentGranularity.Phoneme, true);
                pronConfig.applyTo(recognizer);
                SpeechRecognitionResult result = recognizer.recognizeOnceAsync().get();
                if (result.getReason() == ResultReason.RecognizedSpeech) {
                    PronunciationAssessmentResult pronResult = PronunciationAssessmentResult.fromResult(result);
                    return new AssessmentResult(pronResult.getPronunciationScore(), pronResult.getAccuracyScore(),
                            pronResult.getFluencyScore(), pronResult.getCompletenessScore(), result.getText());
                } else if (result.getReason() == ResultReason.NoMatch) {
                    throw new RuntimeException("Speech could not be recognized.");
                } else {
                    CancellationDetails cancellation = CancellationDetails.fromResult(result);
                    throw new RuntimeException("Azure Speech API canceled: " + cancellation.getErrorDetails());
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Error processing Azure Pronunciation Assessment: " + e.getMessage(), e);
        } finally {
            if (tempFile != null && tempFile.exists()) tempFile.delete();
        }
    }

    @Override public String getProviderName() { return "AZURE"; }
}
