package com.example.WebsiteAlgorithm.model;

import jakarta.persistence.*;

@Entity
@Table( name = "userprofile")
public class UserProfile {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private User user;

    private String targetCareer; // Backend, DevOps, Data...
    private String skillLevel;   // Beginner, Intermediate, Advanced
}
