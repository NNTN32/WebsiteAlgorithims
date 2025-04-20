package com.example.WebsiteAlgorithm.controller;

import com.example.WebsiteAlgorithm.dto.Auth.AuthRequest;
import com.example.WebsiteAlgorithm.service.AuthRedisProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class WebSocketLoginController {
    @Autowired
    private AuthRedisProducer producer;

    @MessageMapping("/login")
    public void login(@Payload AuthRequest request, Principal principal) {
        request.setSession(principal.getName());
        producer.sendLoginRequest(request);
    }
}