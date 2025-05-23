package com.example.WebsiteAlgorithm.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "leaderboard")
public class LeaderBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    private Integer score;
    private Integer totalAccepted;
    private Integer rank;

    private LocalDateTime updatedAt;
}
