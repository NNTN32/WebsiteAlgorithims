package com.example.WebsiteAlgorithm.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.*;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

@Service
public class OllamaService {
    private final OkHttpClient client = new OkHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();

    public String generateCodeTemplate(String language, String problemTitle) throws IOException {
        String lang = language.trim().toLowerCase();
        boolean needsClass = lang.contains("java") || lang.contains("c++") || lang.contains("c#") || lang.contains("kotlin");

        String prompt = needsClass
                ? String.format("You are an expert in %s. Generate a minimal class template with a main method for this problem:\n\"%s\"\nReturn only code, no explanation, in Markdown code block.", language, problemTitle)
                : String.format("You are an expert in %s. Generate a minimal main function template for this problem:\n\"%s\"\nReturn only code, no explanation, in Markdown code block.", language, problemTitle);

        Map<String, Object> requestBodyMap = new HashMap<>();
        requestBodyMap.put("model", "codellama:7b-instruct");
        requestBodyMap.put("prompt", prompt);

        RequestBody requestBody = RequestBody.create(
                MediaType.parse("application/json; charset=utf-8"),
                mapper.writeValueAsBytes(requestBodyMap)
        );

        Request request = new Request.Builder()
                .url("http://localhost:11434/api/generate")
                .post(requestBody)
                .addHeader("Content-Type", "application/json")
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                String body = response.body() != null ? response.body().string() : "Empty response";
                throw new IOException("Ollama API error: " + response.code() + " - " + body);
            }

            StringBuilder finalResponse = new StringBuilder();
            if (response.body() != null) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(response.body().byteStream()));
                String line;
                while ((line = reader.readLine()) != null) {
                    JsonNode chunk = mapper.readTree(line);
                    if (chunk.has("response")) {
                        finalResponse.append(chunk.get("response").asText());
                    }
                }
            }

            String rawCode = finalResponse.toString().trim();
            return rawCode.replaceAll("(?s)```[a-z]*\\s*", "").replaceAll("```", "").trim();
        }
    }
}