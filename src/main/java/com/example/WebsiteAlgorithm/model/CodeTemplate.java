package com.example.WebsiteAlgorithm.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "codeTemplate")
public class CodeTemplate {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Problem problem;

    private String language; // Java, Python, etc.
    @Lob private String template;

    private LocalDateTime createdAt;
}
