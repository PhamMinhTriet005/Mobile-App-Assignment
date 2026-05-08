package com.mobiledev.SEdu.learning.repository;

import com.mobiledev.SEdu.learning.model.Language;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LanguageRepository extends MongoRepository<Language, String> {
}
