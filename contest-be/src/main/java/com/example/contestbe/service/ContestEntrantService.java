package com.example.contestbe.service;

import com.example.contestbe.dao.ContestEntrantDAO;
import com.example.contestbe.dto.DrawResultDTO;
import com.example.contestbe.dto.RegistrationRequestDTO;
import com.example.contestbe.dto.ResponseDTO;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContestEntrantService {

    private final ContestEntrantDAO contestEntrantDAO;

    public ResponseDTO register(RegistrationRequestDTO registrationRequestDTO) {
        registrationRequestDTO.setEmail(registrationRequestDTO.getEmail().trim().toLowerCase());
        String md5Hex = DigestUtils
                .md5Hex(registrationRequestDTO.getEmail()).toLowerCase();
        registrationRequestDTO.setHash(md5Hex);

        registrationRequestDTO.setCanContact(registrationRequestDTO.getCanContact() == null ? Boolean.FALSE : registrationRequestDTO.getCanContact());
        return contestEntrantDAO.save(registrationRequestDTO);
    }

    public DrawResultDTO performDrawAndGetResults(int number) {
        return contestEntrantDAO.performDrawAndGetResults(number);
    }

    public long getTotalParticipants() {
        return contestEntrantDAO.getTotalParticipants();
    }

    public boolean contestPerformed() {
        return contestEntrantDAO.getDrawResults().getIdx() != null;
    }
}
