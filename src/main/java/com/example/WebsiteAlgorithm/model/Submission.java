package com.example.WebsiteAlgorithm.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "submission")
@Data
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Problem problem; // bây giờ đã dùng đúng entity

    private String language;

    @Lob
    private String code;

    private boolean isAccepted;
    private int runtime;
    private int memoryUsage;

    private LocalDateTime submittedAt;
}