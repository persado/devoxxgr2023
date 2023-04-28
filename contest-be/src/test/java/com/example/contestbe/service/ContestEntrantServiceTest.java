package com.example.contestbe.service;

import com.example.contestbe.dto.RegistrationRequestDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ContestEntrantServiceTest {

    @Autowired
    ContestEntrantService contestEntrantService;

    @Test
    void register() {
        for (int i=0; i<100; i++) {
            RegistrationRequestDTO registrationRequestDTO = RegistrationRequestDTO
                    .builder()
                    .email("email" + i + "@xx.com")
                    .fullname("name" + i)
                    .stack("x")
                    .canContact(false)
                    .build();

            contestEntrantService.register(registrationRequestDTO);
        }

    }
}