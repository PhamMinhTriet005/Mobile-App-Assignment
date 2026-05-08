package com.mobiledev.SEdu.learning.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "languages")
public class Language {
    @Id
    private String id;
    private String code;
    private String name;

    public Language() {}
    public Language(String code, String name) { this.code = code; this.name = name; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
