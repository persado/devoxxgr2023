package com.example.contestbe.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Getter
@Setter
public class ContestEntrant {
    @Id
    @Size(max = 80)
    private String email;

    @Size(max = 200)
    private String fullname;

    private Integer idx;

    @Size(max = 64)
    private String hash;

    private Long drawId;

    @Column(updatable = false)
    @CreationTimestamp
    private Instant entryTs;

    private Boolean canContact;

    private String stack;

    @Column(updatable = false)
    private Instant drawDate;








}
