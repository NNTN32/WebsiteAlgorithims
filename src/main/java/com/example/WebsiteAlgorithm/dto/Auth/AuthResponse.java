package com.example.WebsiteAlgorithm.dto.Auth;

import com.example.WebsiteAlgorithm.model.Role;

public class AuthResponse {
    private String token;
    private Long id;
    private String username;
    private Role role;

    public AuthResponse() {
    }

    public AuthResponse(String token, Long id, String username, Role role) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}