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
public class Registration {
    @Id
    private String email;
    private String name;
    private String stack;

    private Boolean openToWork;

    @Column(updatable = false)
    @CreationTimestamp
    private Instant createdAt;

    private String md5Hex;

}
