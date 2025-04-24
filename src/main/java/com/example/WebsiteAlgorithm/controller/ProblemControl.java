package com.example.WebsiteAlgorithm.controller;

import com.example.WebsiteAlgorithm.config.JwtTokenProvider;
import com.example.WebsiteAlgorithm.dto.Auth.Testcase.TestRequest;
import com.example.WebsiteAlgorithm.model.Problem;
import com.example.WebsiteAlgorithm.service.ProblemService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/problem")
@RequiredArgsConstructor
public class ProblemControl {
    @Autowired
    private JwtTokenProvider tokenProvider;

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
    public ResponseEntity<?> getProblemDetails(
            @PathVariable Long problemId,
            @RequestHeader("Authorization") String authHeader) {

        try {
            //Lấy token từ header
            if (!StringUtils.hasText(authHeader) || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
            }
            String token = authHeader.substring(7); // Cắt "Bearer "

            // Xác thực token
            if (!tokenProvider.validateToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
            }

            // Check role là USER
            String role = tokenProvider.extractClaim(token, claims -> claims.get("role", String.class));
            if (!"USER".equals(role)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied: Role must be USER");
            }

            // Gọi service lấy chi tiết bài toán
            ResponseEntity<Map<String, Object>> response = problemService.getProblemDetailsById(problemId);
            return response;

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error: " + e.getMessage());
        }
    }
}
