package com.example.WebsiteAlgorithm.dto.Auth.Testcase;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TestRequest {
    private Long id;
    private String title;
    private String description;
    private String difficulty;
    private String topicTags;

    public TestRequest(Long id, String title, String description, String difficulty, String topicTags) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.topicTags = topicTags;
    }

    public Long getId(){return id; }
    public void setId(Long id) {this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getTopicTags() { return topicTags; }
    public void setTopicTags(String topicTags) { this.topicTags = topicTags; }
}
