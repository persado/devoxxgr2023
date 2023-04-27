package com.example.contestbe.repository;
import com.example.contestbe.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration, String> {
    List<Registration> findByMd5HexStartingWith(String s);
}