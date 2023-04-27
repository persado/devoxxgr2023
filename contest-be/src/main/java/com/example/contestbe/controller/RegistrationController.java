package com.example.contestbe.controller;

import com.example.contestbe.dto.RegistrationRequestDTO;
import com.example.contestbe.dto.RegistrationResponseDTO;
import com.example.contestbe.service.RegistrationService;
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
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RegistrationResponseDTO> register(@RequestBody RegistrationRequestDTO registrationRequestDTO) {
        RegistrationResponseDTO registrationResponseDTO = registrationService.register(registrationRequestDTO);
        if (CollectionUtils.isEmpty(registrationResponseDTO.getErrorMessages())) {
            return ResponseEntity.ok(registrationResponseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(registrationResponseDTO);
        }

    }
}
