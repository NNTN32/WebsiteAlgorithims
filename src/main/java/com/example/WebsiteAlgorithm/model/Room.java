package com.example.WebsiteAlgorithm.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "room")
public class Room {
    @Id @GeneratedValue
    private Long id;

    private String name;

    @ManyToOne
    private User host;

    private LocalDateTime createdAt;
}
