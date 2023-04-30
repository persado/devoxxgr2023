package com.example.contestbe.controller;

import com.example.contestbe.dto.ResponseDTO;
import com.example.contestbe.service.ContestEntrantService;
import com.example.contestbe.utils.ContestUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;


@RestController
@RequiredArgsConstructor
@CrossOrigin
@Slf4j
public class DrawController {

    private final ContestEntrantService contestEntrantService;
    private final ContestUtils contestUtils;

    @PostMapping(value = "/draw", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> draw(@RequestParam int idx) {

        Set<String> errorMessages = contestUtils.validateContestOpening();
        if (!errorMessages.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseDTO.builder().errorMessages(errorMessages).build());
        }

        if (idx < 0 || idx > 9) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseDTO.builder().errorMessages(Set.of("Invalid idx number. Number must be between 0 and 9.")).build());
        }

        return ResponseEntity.ok(contestEntrantService.getWinners(idx));

    }

    @GetMapping(value = "/total_participants", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getTotalParticipants() {
        return ResponseEntity.ok(contestEntrantService.getTotalParticipants());
    }
}
