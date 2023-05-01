package com.example.contestbe.repository;
import com.example.contestbe.entity.ContestEntrant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.List;

public interface ContestEntrantRepository extends JpaRepository<ContestEntrant, String> {

    long countByIdxIsNotNull();

    @Modifying
    @Query(
            value = "update contest_entrant set idx = :idxNumber, " +
                    "draw_id =  CAST(SUBSTRING( hash FROM :idxNumber FOR 8) AS RAW(16) ), " +
                    "draw_date = :drawDate",
            nativeQuery = true
    )
    void updateDrawId(int idxNumber, Instant drawDate);

    List<ContestEntrant> findTop20ByDrawIdIsNotNullOrderByDrawIdAsc();
}