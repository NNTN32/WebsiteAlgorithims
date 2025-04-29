package com.example.WebsiteAlgorithm.service;

import com.example.WebsiteAlgorithm.controller.TemplateControl;
import com.example.WebsiteAlgorithm.model.CodeTemplate;
import com.example.WebsiteAlgorithm.model.Problem;
import com.example.WebsiteAlgorithm.repository.ProblemRepo;
import com.example.WebsiteAlgorithm.repository.TemplateRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
                    newTemplate.setTemplate(""); // ban đầu trống
                    newTemplate.setCreatedAt(LocalDateTime.now());
                    return templateRepo.save(newTemplate);
                });

        if (!force && template.getTemplate() != null && !template.getTemplate().isBlank()) {
            return template; // ❄️ cache hit
        }

        String prompt = template.getProblem().getDescription();
        String generatedTemplate = ollamaService.generateCodeTemplate(language, prompt);

        // Log output to ensure generated template is valid
        System.out.println("Generated template: " + generatedTemplate);

        if (generatedTemplate == null || generatedTemplate.isBlank()) {
            throw new RuntimeException("Generated template is empty");
        }

        // Log before saving to DB
        System.out.println("Saving template: " + generatedTemplate);
        template.setTemplate(generatedTemplate);
        template.setUpdatedAt(LocalDateTime.now());

        return templateRepo.save(template);
    }

    public List<CodeTemplate> getTemplatesByProblem(Long problemId) {
        return templateRepo.findAllByProblemId(problemId);
    }
}