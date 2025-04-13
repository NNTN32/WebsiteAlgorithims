package com.example.WebsiteAlgorithm.model;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "roommate")
@Data
public class RoomMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne private Room room;
    @ManyToOne private User user;

    private LocalDateTime joinedAt;
}
