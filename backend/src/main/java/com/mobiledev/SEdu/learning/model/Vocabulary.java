package com.mobiledev.SEdu.learning.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "vocabularies")
public class Vocabulary {
    @Id
    private String id;
    private String topicId;
    private String word;
    private String meaning;
    private String type;
    private String imageUrl;
    private String audioUrl;

    public Vocabulary() {}
    public Vocabulary(String topicId, String word, String meaning, String type, String imageUrl, String audioUrl) {
        this.topicId = topicId; this.word = word; this.meaning = meaning;
        this.type = type; this.imageUrl = imageUrl; this.audioUrl = audioUrl;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTopicId() { return topicId; }
    public void setTopicId(String topicId) { this.topicId = topicId; }
    public String getWord() { return word; }
    public void setWord(String word) { this.word = word; }
    public String getMeaning() { return meaning; }
    public void setMeaning(String meaning) { this.meaning = meaning; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getAudioUrl() { return audioUrl; }
    public void setAudioUrl(String audioUrl) { this.audioUrl = audioUrl; }
}
