package com.example.WebsiteAlgorithm.model;

import jakarta.persistence.*;
import org.springframework.beans.factory.parsing.Problem;

import java.time.LocalDateTime;

@Entity
@Table(name = "submission")
public class Submission {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne private User user;
    @ManyToOne private Problem problem;

    private String language;
    @Lob private String code;

    private boolean isAccepted;
    private int runtime;
    private int memoryUsage;

    private LocalDateTime submittedAt;
}
