package com.example.WebsiteAlgorithm.controller;

import com.example.WebsiteAlgorithm.dto.Auth.Testcase.TestReponse;
import com.example.WebsiteAlgorithm.model.TestCase;
import com.example.WebsiteAlgorithm.service.TestcaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestCaseControl {
    @Autowired
    private TestcaseService testcaseService;

    @PostMapping("/{problemId}")
    public ResponseEntity<?> create(@PathVariable Long problemId, @RequestBody TestReponse req) throws Exception {
        return ResponseEntity.ok(testcaseService.create(problemId, req));
    }

    @GetMapping("/{problemId}")
    public ResponseEntity<?> getTestCasesByProblemId(@PathVariable Long problemId) {
        try {
            ResponseEntity<Map<String, Object>> response = testcaseService.getTestCasesByProblemId(problemId);
            return response;
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error: " + e.getMessage());
        }
    }

}
