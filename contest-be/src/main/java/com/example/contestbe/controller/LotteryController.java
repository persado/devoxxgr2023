package com.example.contestbe.controller;

import com.example.contestbe.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@CrossOrigin
public class LotteryController {

    private final RegistrationService registrationService;

    @PostMapping(value = "/lottery/{number}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> draw(@PathVariable int number) {
        return ResponseEntity.ok(registrationService.getWinners(number));
    }
}
