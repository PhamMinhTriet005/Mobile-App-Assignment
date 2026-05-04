package com.mobiledev.SEdu.business;

import com.mobiledev.SEdu.domain.Vocabulary;
import com.mobiledev.SEdu.persistence.VocabularyPersistence;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VocabularyBusiness {

    private final VocabularyPersistence vocabularyPersistence;

    public VocabularyBusiness(VocabularyPersistence vocabularyPersistence) {
        this.vocabularyPersistence = vocabularyPersistence;
    }

    public List<Vocabulary> getAllVocabularies() {
        return vocabularyPersistence.findAll();
    }

    public Optional<Vocabulary> getVocabularyById(String id) {
        return vocabularyPersistence.findById(id);
    }

    public List<Vocabulary> getVocabulariesByTopicId(String topicId) {
        return vocabularyPersistence.findByTopicId(topicId);
    }

    public Vocabulary createVocabulary(Vocabulary vocabulary) {
        return vocabularyPersistence.save(vocabulary);
    }

    public void deleteVocabulary(String id) {
        vocabularyPersistence.deleteById(id);
    }
}
