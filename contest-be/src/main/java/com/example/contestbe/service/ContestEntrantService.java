package com.example.contestbe.service;

import com.example.contestbe.dao.ContestEntrantDAO;
import com.example.contestbe.dto.DrawResultDTO;
import com.example.contestbe.dto.RegistrationRequestDTO;
import com.example.contestbe.dto.RegistrationResponseDTO;
import com.example.contestbe.dto.WinnerDTO;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ContestEntrantService {

    private final ContestEntrantDAO contestEntrantDAO;

    public RegistrationResponseDTO register(RegistrationRequestDTO registrationRequestDTO) {

        // TODO validate length of name, email
        if (StringUtils.isBlank(registrationRequestDTO.getEmail())) {
            return RegistrationResponseDTO.builder().errorMessages(Set.of("Email cannot be blank")).build();
        }

        if (StringUtils.isBlank(registrationRequestDTO.getFullname())) {
            return RegistrationResponseDTO.builder().errorMessages(Set.of("Full name cannot be blank")).build();
        }

        registrationRequestDTO.setEmail(registrationRequestDTO.getEmail().trim());
        String md5Hex = DigestUtils
                .md5Hex(registrationRequestDTO.getEmail());
        registrationRequestDTO.setHash(md5Hex);


        registrationRequestDTO.setCanContact(registrationRequestDTO.getCanContact() == null ? Boolean.FALSE : registrationRequestDTO.getCanContact());
        return contestEntrantDAO.save(registrationRequestDTO);
    }

    public DrawResultDTO getWinners(int number) {
        return contestEntrantDAO.getWinners(number);
    }

    public long getTotalParticipants() {
        return contestEntrantDAO.getTotalParticipants();
    }
}
