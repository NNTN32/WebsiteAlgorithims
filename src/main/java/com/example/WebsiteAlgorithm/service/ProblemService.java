package com.example.WebsiteAlgorithm.service;

import com.example.WebsiteAlgorithm.dto.Auth.Testcase.TestRequest;
import com.example.WebsiteAlgorithm.model.Problem;
import com.example.WebsiteAlgorithm.repository.ProblemRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProblemService {
    @Autowired
    private ProblemRepo problemRepository;


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
}
