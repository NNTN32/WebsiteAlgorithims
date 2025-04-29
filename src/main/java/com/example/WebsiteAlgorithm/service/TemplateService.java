package com.example.WebsiteAlgorithm.service;

import com.example.WebsiteAlgorithm.controller.TemplateControl;
import com.example.WebsiteAlgorithm.model.CodeTemplate;
import com.example.WebsiteAlgorithm.model.Problem;
import com.example.WebsiteAlgorithm.repository.ProblemRepo;
import com.example.WebsiteAlgorithm.repository.TemplateRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.PrivilegedAction;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;

@Service
public class TemplateService {

    @Autowired
    private ProblemRepo problemRepository;
    @Autowired
    private TemplateRepo templateRepo;
    @Autowired
    private OllamaService ollamaService;

    @Autowired
    public TemplateService(ProblemRepo problemRepository,
                           TemplateRepo templateRepo, OllamaService ollamaService) {
        this.problemRepository = problemRepository;
        this.templateRepo = templateRepo;
        this.ollamaService = ollamaService;

    }

    @Transactional
    public CodeTemplate generateSingleTemplate(Long problemId, String language, boolean force) throws IOException {
        CodeTemplate template = templateRepo.findByProblemIdAndLanguage(problemId, language)
                .orElseGet(() -> {
                    Problem problem = problemRepository.findById(problemId)
                            .orElseThrow(() -> new RuntimeException("Problem not found with ID: " + problemId));

                    CodeTemplate newTemplate = new CodeTemplate();
                    newTemplate.setProblem(problem);
                    newTemplate.setLanguage(language);
                    newTemplate.setTemplate(""); // Ban đầu trống
                    newTemplate.setCreatedAt(LocalDateTime.now());
                    return templateRepo.save(newTemplate);
                });

        if (!force && template.getTemplate() != null && !template.getTemplate().isBlank()) {
            return template; // Cache hit
        }

        String problemDescription = template.getProblem().getDescription();
        String generatedTemplate = ollamaService.generateCodeTemplate(language, problemDescription);

        if (generatedTemplate == null || generatedTemplate.isBlank()) {
            throw new RuntimeException("Generated template is empty");
        }

        template.setTemplate(generatedTemplate);
        template.setUpdatedAt(LocalDateTime.now());

        System.out.println("Saving template to DB:");
        System.out.println(template.getTemplate());
        return templateRepo.save(template);
    }

    public ResponseEntity<?> getTemplateByProblemAndLanguage(Long problemId, String language) {
        Optional<CodeTemplate> optionalTemplate = templateRepo.findByProblemIdAndLanguage(problemId, language);

        if (optionalTemplate.isPresent()) {
            CodeTemplate template = optionalTemplate.get();
            return ResponseEntity.ok(Map.of(
                    "message", "Template fetched successfully",
                    "template", Map.of(
                            "language", template.getLanguage(),
                            "content", template.getTemplate(),
                            "createdAt", template.getCreatedAt(),
                            "updatedAt", template.getUpdatedAt()
                    )
            ));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Template not found"));
        }
    }
}