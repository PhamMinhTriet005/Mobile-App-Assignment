package com.mobiledev.SEdu.assessment.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class PronunciationProviderFactory {
    private final Map<String, PronunciationAssessmentService> services;
    private final String activeProvider;

    public PronunciationProviderFactory(List<PronunciationAssessmentService> serviceList,
            @Value("${app.ai.speech.provider:AZURE}") String activeProvider) {
        this.services = serviceList.stream()
                .collect(Collectors.toMap(PronunciationAssessmentService::getProviderName, s -> s));
        this.activeProvider = activeProvider.toUpperCase();
    }

    public PronunciationAssessmentService getActiveService() {
        PronunciationAssessmentService service = services.get(activeProvider);
        if (service == null) throw new IllegalArgumentException("Unknown AI Speech Provider: " + activeProvider);
        return service;
    }
}
