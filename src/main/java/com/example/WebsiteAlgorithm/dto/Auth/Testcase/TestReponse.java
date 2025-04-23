package com.example.WebsiteAlgorithm.dto.Auth.Testcase;

import lombok.Data;

@Data
public class TestReponse {
    private Long id;
    private String input;
    private String expectedOutput;
    private boolean sample;
//    private TestRequest problem;

    public TestReponse(Long id, String input, String expectedOutput, Boolean sample){
        this.id = id;
        this.input = input;
        this.expectedOutput = expectedOutput;
        this.sample = sample;
    }

    public Long getId() {return id;}

    public void setId(Long id) {
        this.id = id;
    }

    public String getInput() {
        return input != null ? input.substring(0, Math.min(input.length(), 100)) : ""; // Lấy tối đa 100 ký tự
    }

    public void setInput(String input) {
        this.input = input;
    }

    public String getExpectedOutput() {
        return expectedOutput != null ? expectedOutput.substring(0, Math.min(expectedOutput.length(), 100)) : ""; // Lấy tối đa 100 ký tự
    }

    public void setExpectedOutput(String expectedOutput) {
        this.expectedOutput = expectedOutput;
    }

    public boolean isSample() { return sample; }
    public void setSample(boolean sample) { this.sample = sample; }

//    public TestRequest getProblem() {
//        return problem;
//    }
//
//    public void setProblem(TestRequest problem) {
//        this.problem = problem;
//    }
}
