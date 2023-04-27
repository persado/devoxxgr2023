package com.example.contestbe.dao;

import com.example.contestbe.dto.RegistrationRequestDTO;
import com.example.contestbe.dto.RegistrationResponseDTO;
import com.example.contestbe.dto.WinnerResponseDTO;
import com.example.contestbe.entity.Registration;
import com.example.contestbe.repository.RegistrationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
@Slf4j
public class RegistrationDAO {

    private final RegistrationRepository registrationRepository;
    private final ModelMapper modelMapper;

    public RegistrationResponseDTO save(RegistrationRequestDTO registrationRequestDTO) {
        RegistrationResponseDTO registrationResponseDTO = new RegistrationResponseDTO();
        try {
            registrationRepository.save(modelMapper.map(registrationRequestDTO, Registration.class));
        } catch (Exception e) {
            log.error("Unable to register user {}, error: {}", registrationRequestDTO.getEmail(), e.getMessage());
            registrationResponseDTO.setErrorMessages(Set.of(e.getMessage()));
        }
        return registrationResponseDTO;
    }

    public List<WinnerResponseDTO> getWinners(int number) {
        //TODO
        List<WinnerResponseDTO> winnersList = registrationRepository.findByMd5HexStartingWith(String.valueOf(number))
                .stream()
                .map(registration -> new WinnerResponseDTO(registration.getEmail(), registration.getName()))
                .collect(Collectors.toList());

        return winnersList;
    }


}
