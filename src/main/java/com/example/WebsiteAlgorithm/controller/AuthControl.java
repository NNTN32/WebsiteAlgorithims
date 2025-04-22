package com.example.WebsiteAlgorithm.controller;


import com.example.WebsiteAlgorithm.dto.Auth.AuthRequest;
import com.example.WebsiteAlgorithm.dto.Auth.AuthResponse;
import com.example.WebsiteAlgorithm.exception.AuthRedisConsumer;
import com.example.WebsiteAlgorithm.service.AuthRedisProducer;
import com.example.WebsiteAlgorithm.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthControl {
    private final AuthService authService;

    @Autowired
    private AuthRedisProducer redisAuthProducer;


    @Autowired
    private RedisTemplate<String, Object> redisTemplate;


    public AuthControl(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        try {
            String result = authService.register(request);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            String sessionId = UUID.randomUUID().toString();
            request.setSession(sessionId);
            redisAuthProducer.sendLoginRequest(request);

            // Trả về sessionId trong response
            Map<String, Object> response = new HashMap<>();
            response.put("sessionId", sessionId);
            response.put("message", "Login request queued");
            response.put("status", "PENDING");

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/login/result/{sessionId}")
    public ResponseEntity<?> getLoginResult(@PathVariable String sessionId) {
        String key = "login:result:" + sessionId;
        Map<Object, Object> result = redisTemplate.opsForHash().entries(key);

        if (result == null || result.isEmpty()) {
            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body(Map.of("status", "PENDING", "message", "Đang xử lý..."));
        }

        return ResponseEntity.ok(result);
    }
}