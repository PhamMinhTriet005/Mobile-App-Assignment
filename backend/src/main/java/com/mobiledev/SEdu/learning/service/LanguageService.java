package com.mobiledev.SEdu.learning.service;

import com.mobiledev.SEdu.learning.model.Language;
import com.mobiledev.SEdu.learning.repository.LanguageRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LanguageService {
    private final LanguageRepository languageRepository;

    public LanguageService(LanguageRepository languageRepository) { this.languageRepository = languageRepository; }

    public List<Language> getAllLanguages() { return languageRepository.findAll(); }
    public Optional<Language> getLanguageById(String id) { return languageRepository.findById(id); }
    public Language createLanguage(Language language) { return languageRepository.save(language); }
    public void deleteLanguage(String id) { languageRepository.deleteById(id); }
}
