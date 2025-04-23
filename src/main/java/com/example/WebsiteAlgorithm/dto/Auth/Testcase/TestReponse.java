package com.example.WebsiteAlgorithm.dto.Auth.Testcase;

import lombok.Data;

@Data
public class TestReponse {
    private String input;
    private String expectedOutput;
    private boolean sample;
    private TestRequest problem;

    public String getInput() { return input; }
    public void setInput(String input) { this.input = input; }

    public String getExpectedOutput() { return expectedOutput; }
    public void setExpectedOutput(String expectedOutput) { this.expectedOutput = expectedOutput; }

    public boolean isSample() { return sample; }
    public void setSample(boolean sample) { this.sample = sample; }

    public TestRequest getProblem() {
        return problem;
    }

    public void setProblem(TestRequest problem) {
        this.problem = problem;
    }
}
