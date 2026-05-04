package com.mobiledev.SEdu.persistence;

import com.mobiledev.SEdu.domain.Language;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LanguagePersistence extends MongoRepository<Language, String> {
    // Custom database queries can be defined here
}
