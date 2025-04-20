package com.example.WebsiteAlgorithm.service;

import com.example.WebsiteAlgorithm.dto.Auth.AuthRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.stream.StreamRecords;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthRedisProducer {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    private static final String STREAM_KEY = "auth:login:stream";

    public void sendLoginRequest(AuthRequest request) {
        Map<String, Object> data = new HashMap<>();
        data.put("username", request.getUsername());
        data.put("password", request.getPassword());
        data.put("sessionId", request.getSession());

        //Log
        System.out.println("Sending to Redis Stream: " + data);
        redisTemplate.opsForStream()
                .add(StreamRecords.newRecord()
                        .in("auth:login:stream")
                        .ofMap(data));
    }
}

