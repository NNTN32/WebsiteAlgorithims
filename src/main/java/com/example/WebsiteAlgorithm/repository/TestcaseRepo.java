package com.example.WebsiteAlgorithm.repository;

import com.example.WebsiteAlgorithm.model.TestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TestcaseRepo extends JpaRepository<TestCase, Long> {
    Optional<TestCase> findByProblemId(Long problemId);

    List<TestCase> findAllByProblemId(Long problemId);
}
