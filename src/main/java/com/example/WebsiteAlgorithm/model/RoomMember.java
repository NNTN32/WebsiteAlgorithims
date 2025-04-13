package com.example.WebsiteAlgorithm.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "roommate")
public class RoomMember {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne private Room room;
    @ManyToOne private User user;

    private LocalDateTime joinedAt;
}
