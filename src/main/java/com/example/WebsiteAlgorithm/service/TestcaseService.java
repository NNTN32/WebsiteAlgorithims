package com.example.WebsiteAlgorithm.service;

import com.example.WebsiteAlgorithm.dto.Auth.Testcase.TestReponse;
import com.example.WebsiteAlgorithm.dto.Auth.Testcase.TestRequest;
import com.example.WebsiteAlgorithm.model.Problem;
import com.example.WebsiteAlgorithm.model.TestCase;
import com.example.WebsiteAlgorithm.repository.ProblemRepo;
import com.example.WebsiteAlgorithm.repository.TestcaseRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TestcaseService {
    @Autowired
    private  TestcaseRepo testCaseRepo;

    @Autowired
    private ProblemRepo problemRepo;
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    @Autowired
    private ObjectMapper objectMapper;

    public TestCase create(Long problemId, TestReponse req) throws Exception {
        Optional<TestCase> existing = testCaseRepo.findByProblemId(problemId);
        if (existing.isPresent()) {
            throw new IllegalStateException("Testcase đã tồn tại cho problem này!");
        }

        Problem problem = problemRepo.findById(problemId)
                .orElseThrow(() -> new IllegalArgumentException("Problem không tồn tại"));

        TestCase tc = new TestCase();
        tc.setProblem(problem);
        tc.setInput(req.getInput());
        tc.setExpectedOutput(req.getExpectedOutput());
        tc.setSample(req.isSample());

        TestCase saved = testCaseRepo.save(tc);

        // Cache Redis
        String key = "testcase:" + problemId;
        redisTemplate.opsForValue().set(key, objectMapper.writeValueAsString(saved));

        return saved;
    }

    public TestReponse getTestCaseByProblemId(Long problemId) throws Exception {
        String key = "testcase:" + problemId;
        String cached = redisTemplate.opsForValue().get(key);

        TestCase tc;

        if (cached != null) {
            tc = objectMapper.readValue(cached, TestCase.class);
        } else {
            tc = testCaseRepo.findByProblemId(problemId)
                    .orElseThrow(() -> new IllegalArgumentException("Không có testcase cho problem này"));
            redisTemplate.opsForValue().set(key, objectMapper.writeValueAsString(tc));
        }

        // Map sang TestResponse
        TestReponse response = new TestReponse();
        response.setInput(tc.getInput());
        response.setExpectedOutput(tc.getExpectedOutput());
        response.setSample(tc.isSample());

        // Map Problem => TestRequest
        if (tc.getProblem() != null) {
            Problem p = tc.getProblem();
            TestRequest pr = new TestRequest(
                    p.getId(),
                    p.getTitle(),
                    p.getDescription(),
                    p.getDifficulty(),
                    p.getTopicTags()
            );
            response.setProblem(pr);
        }

        return response;
    }
}
