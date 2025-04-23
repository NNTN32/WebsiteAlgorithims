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

    @OneToOne
    @JoinColumn(name = "problem_id", unique = true)
    private Problem problem;

    @Lob
    private String input;
    @Lob private String expectedOutput;

    private boolean isSample;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Problem getProblem() { return problem; }
    public void setProblem(Problem problem) { this.problem = problem; }

    public String getInput() { return input; }
    public void setInput(String input) { this.input = input; }

    public String getExpectedOutput() { return expectedOutput; }
    public void setExpectedOutput(String expectedOutput) { this.expectedOutput = expectedOutput; }

    public boolean isSample() { return isSample; }
    public void setSample(boolean sample) { isSample = sample; }
}
