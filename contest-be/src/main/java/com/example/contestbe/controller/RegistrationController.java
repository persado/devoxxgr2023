package com.example.contestbe.controller;

import com.example.contestbe.dto.RegistrationRequestDTO;
import com.example.contestbe.dto.ResponseDTO;
import com.example.contestbe.service.ContestEntrantService;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.Set;


@RestController
public class RegistrationController {

    private final ContestEntrantService contestEntrantService;
    private final Bucket bucket;

    public RegistrationController(ContestEntrantService contestEntrantService) {
        this.contestEntrantService = contestEntrantService;

        Bandwidth limit = Bandwidth.classic(50, Refill.intervally(50, Duration.ofMinutes(1)));
        this.bucket = Bucket.builder()
                .addLimit(limit)
                .build();

    }

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDTO> register(@Valid @RequestBody RegistrationRequestDTO registrationRequestDTO) {

        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(ResponseDTO.builder().errorMessages(Set.of("Too many requests")).build());
        }
        if (contestEntrantService.contestPerformed()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ResponseDTO.builder().errorMessages(Set.of("Contest Expired")).build());
        }

        ResponseDTO responseDTO = contestEntrantService.register(registrationRequestDTO);
        if (CollectionUtils.isEmpty(responseDTO.getErrorMessages())) {
            return ResponseEntity.ok(responseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseDTO);
        }
    }

}
