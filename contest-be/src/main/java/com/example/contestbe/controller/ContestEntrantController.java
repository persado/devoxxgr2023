package com.example.contestbe.controller;

import com.example.contestbe.dto.RegistrationRequestDTO;
import com.example.contestbe.dto.RegistrationResponseDTO;
import com.example.contestbe.service.ContestEntrantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@CrossOrigin
public class ContestEntrantController {

    private final ContestEntrantService contestEntrantService;

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RegistrationResponseDTO> register(@RequestBody RegistrationRequestDTO registrationRequestDTO) {
        RegistrationResponseDTO registrationResponseDTO = contestEntrantService.register(registrationRequestDTO);
        if (CollectionUtils.isEmpty(registrationResponseDTO.getErrorMessages())) {
            return ResponseEntity.ok(registrationResponseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(registrationResponseDTO);
        }

    }
}
