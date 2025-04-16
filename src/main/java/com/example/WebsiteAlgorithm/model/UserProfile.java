package com.example.WebsiteAlgorithm.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table( name = "userprofile")
@Data
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String targetCareer; // Backend, DevOps, Data...
    private String skillLevel;   // Beginner, Intermediate, Advanced
}
