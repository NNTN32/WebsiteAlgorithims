package com.example.WebsiteAlgorithm.model;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "codeTemplate")
@Data
public class CodeTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Problem problem;

    private String language; // Java, Python, etc.
    @Lob private String template;

    private LocalDateTime createdAt;
}
