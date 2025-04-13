package com.example.WebsiteAlgorithm.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "problem")
public class Problem {
    @Id @GeneratedValue
    private Long id;

    private String title;
    @Lob private String description;
    private String difficulty; // Easy, Medium, Hard

    private String topicTags; // eg: "DP, Array, Greedy"
    private LocalDateTime createdAt;
}
