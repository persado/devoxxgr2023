package com.example.contestbe.repository;
import com.example.contestbe.entity.ContestEntrant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContestEntrantRepository extends JpaRepository<ContestEntrant, String> {

}