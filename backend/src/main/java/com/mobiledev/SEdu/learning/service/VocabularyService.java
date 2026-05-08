package com.mobiledev.SEdu.learning.service;

import com.mobiledev.SEdu.learning.model.Vocabulary;
import com.mobiledev.SEdu.learning.repository.VocabularyRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VocabularyService {
    private final VocabularyRepository vocabularyRepository;

    public VocabularyService(VocabularyRepository vocabularyRepository) { this.vocabularyRepository = vocabularyRepository; }

    public List<Vocabulary> getAllVocabularies() { return vocabularyRepository.findAll(); }
    public Optional<Vocabulary> getVocabularyById(String id) { return vocabularyRepository.findById(id); }
    public List<Vocabulary> getVocabulariesByTopicId(String topicId) { return vocabularyRepository.findByTopicId(topicId); }
    public Vocabulary createVocabulary(Vocabulary vocabulary) { return vocabularyRepository.save(vocabulary); }
    public void deleteVocabulary(String id) { vocabularyRepository.deleteById(id); }
}
