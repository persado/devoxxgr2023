package com.example.contestbe.controller;

import com.example.contestbe.dto.StatusDTO;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@Slf4j
public class StatusController {

    @Value("${spring.profiles.active:local}")
    private String activeProfile;

    @Value("${contest.start-date-validation:true}")
    private Boolean contestStartDateValidation;

    @GetMapping(value = "/status", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> status() {
        return ResponseEntity.ok(StatusDTO.builder()
                .profile(activeProfile)
                .contestStartDateValidation(contestStartDateValidation)
                .build());
    }
}
