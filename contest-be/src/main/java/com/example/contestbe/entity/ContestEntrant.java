package com.example.contestbe.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Getter
@Setter
public class ContestEntrant {
    @Id
    private String email;

    private String fullname;

    private Integer idx;

    private String hash;

    private Long drawId;

    @Column(updatable = false)
    @CreationTimestamp
    private Instant entryTs;

    private Boolean canContact;

    private String stack;








}
