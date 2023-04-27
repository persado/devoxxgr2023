package com.example.contestbe.service;

import com.example.contestbe.dao.RegistrationDAO;
import com.example.contestbe.dto.RegistrationRequestDTO;
import com.example.contestbe.dto.RegistrationResponseDTO;
import com.example.contestbe.dto.WinnerResponseDTO;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistrationDAO registrationDAO;

    public RegistrationResponseDTO register(RegistrationRequestDTO registrationRequestDTO) {
        if (StringUtils.isBlank(registrationRequestDTO.getEmail())) {
            return RegistrationResponseDTO.builder().errorMessages(Set.of("Email cannot be blank")).build();
        }

        if (StringUtils.isBlank(registrationRequestDTO.getName())) {
            return RegistrationResponseDTO.builder().errorMessages(Set.of("Full name cannot be blank")).build();
        }

        registrationRequestDTO.setEmail(registrationRequestDTO.getEmail().trim());
        String md5Hex = DigestUtils
                .md5Hex(registrationRequestDTO.getEmail());
        registrationRequestDTO.setMd5Hex(md5Hex);


        registrationRequestDTO.setOpenToWork(registrationRequestDTO.getOpenToWork() == null ? Boolean.FALSE : registrationRequestDTO.getOpenToWork());
        return registrationDAO.save(registrationRequestDTO);
    }

    public List<WinnerResponseDTO> getWinners(int number) {
        //TODO
        return registrationDAO.getWinners(number);
    }
}
