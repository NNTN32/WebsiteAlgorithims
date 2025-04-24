package com.example.WebsiteAlgorithm.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name="draftCode")
@Data
public class DraftCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;
    @ManyToOne
    @JoinColumn(name = "problem_id")
    private Problem problem;

    private String language;
    @Lob private String code;

    private boolean isAccepted;
    private int runtime;
    private int memoryUsage;

    private LocalDateTime submittedAt;
}
