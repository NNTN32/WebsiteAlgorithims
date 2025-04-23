package com.example.WebsiteAlgorithm.service;

import com.example.WebsiteAlgorithm.dto.Auth.Testcase.TestRequest;
import com.example.WebsiteAlgorithm.dto.Auth.Testcase.TestReponse;
import com.example.WebsiteAlgorithm.model.Problem;
import com.example.WebsiteAlgorithm.model.TestCase;
import com.example.WebsiteAlgorithm.repository.ProblemRepo;
import com.example.WebsiteAlgorithm.repository.TestcaseRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProblemService {
    @Autowired
    private ProblemRepo problemRepository;

    @Autowired
    private  TestcaseRepo testCaseRepository;

    @Autowired
    private  RedisTemplate<String, Object> redisTemplate;

    private String PROBLEM_CACHE_PREFIX = "problem:details:";

    public Problem create(TestRequest req) {
        Problem p = new Problem();
        p.setTitle(req.getTitle());
        p.setDescription(req.getDescription());
        p.setDifficulty(req.getDifficulty());
        p.setTopicTags(req.getTopicTags());
        p.setCreatedAt(LocalDateTime.now());
        return problemRepository.save(p);
    }

    public List<Problem> getAllProblems() {
        return problemRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")); // sắp xếp theo thời gian
    }

    @Transactional
    public ResponseEntity<Map<String, Object>> getProblemDetailsById(Long problemId) {
        // Truy vấn từ DB
        System.out.println("📦 Lấy dữ liệu từ DB");
        Optional<Problem> problemOptional = problemRepository.findById(problemId);
        if (problemOptional.isEmpty()) {
            throw new RuntimeException("Problem not found with id: " + problemId);
        }

        Problem p = problemOptional.get();

        // Tạo DTO cho Problem
        TestRequest problemDTO = new TestRequest(
                p.getId(),
                p.getTitle(),
                p.getDescription() != null ? p.getDescription().substring(0, Math.min(p.getDescription().length(), 100)) : null,
                p.getDifficulty(),
                p.getTopicTags()
        );

        // Trả về kết quả dưới dạng ResponseEntity
        Map<String, Object> result = new HashMap<>();
        result.put("problem", problemDTO);
        return ResponseEntity.ok(result);
    }
}
