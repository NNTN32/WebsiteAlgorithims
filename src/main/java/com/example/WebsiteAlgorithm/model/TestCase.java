package com.example.WebsiteAlgorithm.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "testcase")
@Data
public class TestCase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Problem problem;

    @Lob
    private String input;
    @Lob private String expectedOutput;

    private boolean isSample;
}
