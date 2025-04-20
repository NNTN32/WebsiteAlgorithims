package com.example.WebsiteAlgorithm.service;

import com.example.WebsiteAlgorithm.config.JwtTokenProvider;
import com.example.WebsiteAlgorithm.dto.Auth.AuthRequest;
import com.example.WebsiteAlgorithm.dto.Auth.AuthResponse;
import com.example.WebsiteAlgorithm.model.Role;
import com.example.WebsiteAlgorithm.model.Status;
import com.example.WebsiteAlgorithm.model.User;
import com.example.WebsiteAlgorithm.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    private UserRepo userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final String STREAM_KEY = "auth:login:stream";

    public String register(AuthRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username is already taken.");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail() + "@example.com");
        user.setRole(request.getRole());
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);
        return "User registered successfully";
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        String token = tokenProvider.generateToken(user);

        return new AuthResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getRole(),
                Status.SUCCESS,         // Đây là status phản hồi, không phải status trong User entity
                "Login successful"
        );
    }
}
