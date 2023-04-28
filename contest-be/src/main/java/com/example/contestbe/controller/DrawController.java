package com.example.contestbe.controller;

import com.example.contestbe.service.ContestEntrantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@CrossOrigin
public class DrawController {

    private final ContestEntrantService contestEntrantService;

    @PostMapping(value = "/draw", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> draw(@RequestParam() int idx) {
        return ResponseEntity.ok(contestEntrantService.getWinners(idx));
    }

    @GetMapping(value = "/total_participants", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getTotalParticipants() {
        return ResponseEntity.ok(contestEntrantService.getTotalParticipants());
    }
}
