package com.example.WebsiteAlgorithm.service;

import com.example.WebsiteAlgorithm.config.JwtTokenProvider;
import com.example.WebsiteAlgorithm.dto.Auth.AuthRequest;
import com.example.WebsiteAlgorithm.dto.Auth.AuthResponse;
import com.example.WebsiteAlgorithm.model.Role;
import com.example.WebsiteAlgorithm.model.Status;
import com.example.WebsiteAlgorithm.model.User;
import com.example.WebsiteAlgorithm.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {
    private final UserRepo userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepo userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

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
