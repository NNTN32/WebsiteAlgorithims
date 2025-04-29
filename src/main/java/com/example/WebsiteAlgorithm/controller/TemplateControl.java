package com.example.WebsiteAlgorithm.controller;

import com.example.WebsiteAlgorithm.model.CodeTemplate;
import com.example.WebsiteAlgorithm.model.Problem;
import com.example.WebsiteAlgorithm.repository.ProblemRepo;
import com.example.WebsiteAlgorithm.repository.TemplateRepo;
import com.example.WebsiteAlgorithm.service.TemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/code-template")
@RequiredArgsConstructor
public class TemplateControl {
    @Autowired
    private TemplateService templateService;
    @Autowired
    private ProblemRepo problemRepo;
    @Autowired
    private TemplateRepo templateRepo;

    @PostMapping("/addLanguage/{problemId}")
    public ResponseEntity<?> addLanguagesToProblem(
            @PathVariable Long problemId,
            @RequestBody List<String> languages // Nhận danh sách ngôn ngữ
    ) {
        Problem problem = problemRepo.findById(problemId)
                .orElseThrow(() -> new RuntimeException("Problem not found with ID: " + problemId));

        // Kiểm tra từng ngôn ngữ trong danh sách
        for (String language : languages) {
            if (templateRepo.existsByProblemIdAndLanguage(problemId, language)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Language " + language + " already exists for this problem"));
            }

            // Lưu ngôn ngữ vào cơ sở dữ liệu
            CodeTemplate template = new CodeTemplate();
            template.setProblem(problem);
            template.setLanguage(language);
            template.setCreatedAt(LocalDateTime.now());

            templateRepo.save(template);
        }

        return ResponseEntity.ok(Map.of("message", "Languages added successfully"));
    }

    @GetMapping("/languages/{problemId}")
    public ResponseEntity<?> getLanguagesByProblemId(@PathVariable Long problemId) {
        // Kiểm tra xem problem có tồn tại không
        Problem problem = problemRepo.findById(problemId)
                .orElseThrow(() -> new RuntimeException("Problem not found with ID: " + problemId));

        // Lấy danh sách các ngôn ngữ có template từ bảng CodeTemplate
        List<String> languages = templateRepo.findLanguagesByProblemId(problemId);

        return ResponseEntity.ok(Map.of(
                "problemId", problemId,
                "languages", languages
        ));
    }

    @PutMapping("/generateTemplate/{problemId}/{language}")
    public ResponseEntity<?> generateTemplateForOneLanguage(
            @PathVariable Long problemId,
            @PathVariable String language,
            @RequestParam(defaultValue = "false") boolean force
    ) {
        try {
            CodeTemplate newTemplate = templateService.generateSingleTemplate(problemId, language, force);
            return ResponseEntity.ok(Map.of(
                    "message", "Template generated successfully",
                    "template", newTemplate.getTemplate()
            ));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(Map.of("message", e.getMessage()));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error while generating template", "details", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{problemId}")
    public ResponseEntity<List<CodeTemplate>> getTemplates(@PathVariable Long problemId) {
        return ResponseEntity.ok(templateService.getTemplatesByProblem(problemId));
    }

}
