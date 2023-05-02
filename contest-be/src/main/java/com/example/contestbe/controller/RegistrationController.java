package com.example.contestbe.controller;

import com.example.contestbe.dto.RegistrationRequestDTO;
import com.example.contestbe.dto.ResponseDTO;
import com.example.contestbe.service.ContestEntrantService;
import jakarta.validation.Valid;
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
@CrossOrigin(origins = {"http://localhost:3000", "https://persado.github.io"})
public class RegistrationController {

    private final ContestEntrantService contestEntrantService;

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseDTO> register(@Valid @RequestBody RegistrationRequestDTO registrationRequestDTO) {
        ResponseDTO responseDTO = contestEntrantService.register(registrationRequestDTO);
        if (CollectionUtils.isEmpty(responseDTO.getErrorMessages())) {
            return ResponseEntity.ok(responseDTO);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseDTO);
        }
    }

}
