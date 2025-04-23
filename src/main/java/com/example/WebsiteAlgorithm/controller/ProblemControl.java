package com.example.WebsiteAlgorithm.controller;

import com.example.WebsiteAlgorithm.dto.Auth.Testcase.TestRequest;
import com.example.WebsiteAlgorithm.model.Problem;
import com.example.WebsiteAlgorithm.service.ProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/problem")
@RequiredArgsConstructor
public class ProblemControl {
    @Autowired
    private ProblemService problemService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody TestRequest req) {
        return ResponseEntity.ok(problemService.create(req));
    }

    @GetMapping
    public ResponseEntity<List<TestRequest>> getAllProblems() {
        List<Problem> problems = problemService.getAllProblems();

        List<TestRequest> result = problems.stream()
                .map(problem -> new TestRequest(
                        problem.getId(),
                        problem.getTitle(),
                        problem.getDescription(),
                        problem.getDifficulty(),
                        problem.getTopicTags()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    @GetMapping("/{problemId}")
    public ResponseEntity<?> getProblemDetails(@PathVariable Long problemId) {
        try {
            // Gọi service để lấy thông tin Problem
            ResponseEntity<Map<String, Object>> response = problemService.getProblemDetailsById(problemId);
            return response;
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error: " + e.getMessage());
        }
    }
}
