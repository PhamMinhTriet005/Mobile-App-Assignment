package com.mobiledev.SEdu.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "topics")
public class Topic {

    @Id
    private String id;
    private String languageId;
    private String name;

    public Topic() {
    }

    public Topic(String languageId, String name) {
        this.languageId = languageId;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLanguageId() {
        return languageId;
    }

    public void setLanguageId(String languageId) {
        this.languageId = languageId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
