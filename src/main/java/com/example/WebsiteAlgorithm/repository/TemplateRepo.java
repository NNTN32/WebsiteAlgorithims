package com.example.WebsiteAlgorithm.repository;

import com.example.WebsiteAlgorithm.model.CodeTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TemplateRepo extends JpaRepository<CodeTemplate, Long> {
    boolean existsByProblemIdAndLanguage(Long problemId, String language);
    List<CodeTemplate> findAllByProblemId(Long problemId);
    @Query("SELECT t.language FROM CodeTemplate t WHERE t.problem.id = :problemId")
    List<String> findLanguagesByProblemId(@Param("problemId") Long problemId);
    @Query("SELECT t FROM CodeTemplate t WHERE t.problem.id = :problemId AND LOWER(t.language) = LOWER(:language)")
    Optional<CodeTemplate> findByProblemIdAndLanguage(@Param("problemId") Long problemId, @Param("language") String language);
}
