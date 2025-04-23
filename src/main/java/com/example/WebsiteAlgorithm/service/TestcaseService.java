package com.example.WebsiteAlgorithm.service;

import com.example.WebsiteAlgorithm.dto.Auth.Testcase.TestReponse;
import com.example.WebsiteAlgorithm.dto.Auth.Testcase.TestRequest;
import com.example.WebsiteAlgorithm.model.Problem;
import com.example.WebsiteAlgorithm.model.TestCase;
import com.example.WebsiteAlgorithm.repository.ProblemRepo;
import com.example.WebsiteAlgorithm.repository.TestcaseRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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

//    public List<TestReponse> getTestCasesByProblemId(Long problemId) {
//        List<TestCase> testCases = testCaseRepo.findAllByProblemId(problemId);
//        if (testCases.isEmpty()) {
//            throw new IllegalArgumentException("Không có Testcase cho problem này");
//        }
//
//        return testCases.stream().map(tc -> {
//            TestReponse dto = new TestReponse();
//            dto.setId(tc.getId());
//            dto.setInput(tc.getInput());  // Getter đã cắt tối đa 100 ký tự rồi
//            dto.setExpectedOutput(tc.getExpectedOutput());  // Cũng đã xử lý
//            dto.setSample(tc.isSample());
//
//            // Nếu muốn đính kèm thông tin Problem thì convert Problem → TestRequest
//            // hoặc để null nếu không cần
//            dto.setProblem(null);  // Hoặc convert nếu cần
//            return dto;
//        }).collect(Collectors.toList());
//    }

    @Transactional
    public ResponseEntity<Map<String, Object>> getTestCasesByProblemId(Long problemId){
        Optional<TestCase> testCaseOptional = testCaseRepo.findByProblemId(problemId);
        if(testCaseOptional.isEmpty()){
            throw new RuntimeException("Testcase not found with id: " + problemId);
        }

        TestCase tc = testCaseOptional.get();

        TestReponse testReponse = new TestReponse(
                tc.getId(),
                tc.getInput(),
                tc.getExpectedOutput(),
                tc.isSample()
        );
        Map<String, Object> result = new HashMap<>();
        result.put("testcase", testReponse);
        return ResponseEntity.ok(result);
    }



}
