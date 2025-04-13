package com.example.WebsiteAlgorithm.model;

import jakarta.persistence.*;

@Entity
@Table(name = "testcase")
public class TestCase {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Problem problem;

    @Lob
    private String input;
    @Lob private String expectedOutput;

    private boolean isSample;
}
