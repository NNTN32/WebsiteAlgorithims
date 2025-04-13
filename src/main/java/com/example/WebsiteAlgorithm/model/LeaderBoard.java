package com.example.WebsiteAlgorithm.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "leaderBoard")
public class LeaderBoard {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private User user;

    private Integer score;
    private Integer totalAccepted;
    private Integer rank;

    private LocalDateTime updatedAt;
}
