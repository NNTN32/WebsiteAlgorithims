package com.example.WebsiteAlgorithm.exception;

import com.example.WebsiteAlgorithm.dto.Auth.AuthRequest;
import com.example.WebsiteAlgorithm.dto.Auth.AuthResponse;
import com.example.WebsiteAlgorithm.model.Status;
import com.example.WebsiteAlgorithm.service.AuthService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.stream.*;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;

@Component
@RequiredArgsConstructor
public class AuthRedisConsumer {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private AuthService authService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private static final String STREAM_KEY = "auth:login:stream";
    private static final String GROUP = "auth-group";
    private static final String CONSUMER_NAME = "consumer-1";

    @PostConstruct
    public void startConsumer() {
        try {
            redisTemplate.opsForStream().createGroup(STREAM_KEY, ReadOffset.latest(), GROUP);
        } catch (Exception ignored) {}

        Executors.newSingleThreadExecutor().submit(() -> {
            while (true) {
                List<MapRecord<String, Object, Object>> records = redisTemplate.opsForStream()
                        .read(Consumer.from(GROUP, CONSUMER_NAME),
                                StreamReadOptions.empty().count(10).block(Duration.ofSeconds(1)),
                                StreamOffset.create(STREAM_KEY, ReadOffset.lastConsumed()));

                if (records != null) {
                    for (MapRecord<String, Object, Object> record : records) {
                        String username = (String) record.getValue().get("username");
                        String password = (String) record.getValue().get("password");
                        String sessionId = (String) record.getValue().get("sessionId");

                        try {
                            AuthRequest req = new AuthRequest(username, password, sessionId);
                            AuthResponse response = authService.login(req);

                            // Gửi về frontend (websocket)
                            messagingTemplate.convertAndSendToUser(sessionId, "/queue/login-result", response);

                            // Lưu kết quả vào Redis Hash
                            String resultKey = "login:result:" + sessionId;
                            Map<String, String> resultMap = new HashMap<>();
                            resultMap.put("status", response.getStatus().toString());
                            resultMap.put("username", response.getUsername());
                            resultMap.put("token", response.getToken());
                            resultMap.put("id", String.valueOf(response.getId()));
                            resultMap.put("role", String.valueOf(response.getRole()));
                            resultMap.put("message", response.getMessage());

                            redisTemplate.opsForHash().putAll(resultKey, resultMap);
                            redisTemplate.expire(resultKey, Duration.ofMinutes(5));

                        } catch (Exception e) {
                            AuthResponse errorResponse = new AuthResponse(
                                    null, null, username, null, Status.FAIL, e.getMessage());

                            messagingTemplate.convertAndSendToUser(sessionId, "/queue/login-result", errorResponse);

                            // Lưu kết quả thất bại vào Redis Hash
                            String resultKey = "login:result:" + sessionId;
                            Map<String, String> resultMap = new HashMap<>();
                            resultMap.put("status", Status.FAIL.toString());
                            resultMap.put("username", username);
                            resultMap.put("token", "");
                            resultMap.put("id", "");
                            resultMap.put("role", "");
                            resultMap.put("message", e.getMessage());

                            redisTemplate.opsForHash().putAll(resultKey, resultMap);
                            redisTemplate.expire(resultKey, Duration.ofMinutes(5));
                        }

                        // Acknowledge sau xử lý
                        redisTemplate.opsForStream().acknowledge(STREAM_KEY, GROUP, record.getId());
                    }
                }
            }
        });
    }
}