package com.example.WebsiteAlgorithm.controller;

import com.example.WebsiteAlgorithm.dto.Auth.Testcase.TestReponse;
import com.example.WebsiteAlgorithm.service.TestcaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> getTestCase(@PathVariable Long problemId) throws Exception {
        return ResponseEntity.ok(testcaseService.getTestCaseByProblemId(problemId));
    }
}
