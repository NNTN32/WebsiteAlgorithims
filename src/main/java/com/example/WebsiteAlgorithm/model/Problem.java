package com.example.WebsiteAlgorithm.model;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "problem")
@Data
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Lob private String description;
    private String difficulty; // Easy, Medium, Hard

    private String topicTags; // eg: "DP, Array, Greedy"
    private LocalDateTime createdAt;

    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public void setTopicTags(String topicTags) { this.topicTags = topicTags; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Long getId() {return  id; }
    public String getTitle() {return title; }
    public String getDescription() {return description; }
    public String getDifficulty() {return difficulty; }
    public String getTopicTags() {return topicTags; }

}
