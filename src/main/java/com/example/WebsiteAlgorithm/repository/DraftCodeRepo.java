package com.example.WebsiteAlgorithm.repository;

import com.example.WebsiteAlgorithm.model.DraftCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DraftCodeRepo extends JpaRepository<DraftCode, Long> {
}
