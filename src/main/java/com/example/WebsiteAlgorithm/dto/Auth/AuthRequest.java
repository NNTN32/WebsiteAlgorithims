package com.example.WebsiteAlgorithm.dto.Auth;

import com.example.WebsiteAlgorithm.model.Role;
import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;
    private Role role;
    private String email;
    private String sessionID;

    public AuthRequest(String username, String password, String sessionID) {
        this.username = username;
        this.password = password;
        this.sessionID = sessionID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSession(){
        return sessionID;
    }

    public void setSession(String sessionID){
        this.sessionID = sessionID;
    }
}
