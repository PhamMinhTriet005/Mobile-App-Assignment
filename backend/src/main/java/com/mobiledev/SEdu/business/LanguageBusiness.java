package com.mobiledev.SEdu.business;

import com.mobiledev.SEdu.domain.Language;
import com.mobiledev.SEdu.persistence.LanguagePersistence;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LanguageBusiness {

    private final LanguagePersistence languagePersistence;

    public LanguageBusiness(LanguagePersistence languagePersistence) {
        this.languagePersistence = languagePersistence;
    }

    public List<Language> getAllLanguages() {
        return languagePersistence.findAll();
    }

    public Optional<Language> getLanguageById(String id) {
        return languagePersistence.findById(id);
    }

    public Language createLanguage(Language language) {
        return languagePersistence.save(language);
    }

    public void deleteLanguage(String id) {
        languagePersistence.deleteById(id);
    }
}
