package com.example.contestbe.dao;

import com.example.contestbe.dto.DrawResultDTO;
import com.example.contestbe.dto.RegistrationRequestDTO;
import com.example.contestbe.dto.RegistrationResponseDTO;
import com.example.contestbe.dto.WinnerDTO;
import com.example.contestbe.entity.ContestEntrant;
import com.example.contestbe.repository.ContestEntrantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@RequiredArgsConstructor
@Service
@Slf4j
public class ContestEntrantDAO {

    private final ContestEntrantRepository contestEntrantRepository;
    private final ModelMapper modelMapper;

    public RegistrationResponseDTO save(RegistrationRequestDTO registrationRequestDTO) {
        RegistrationResponseDTO registrationResponseDTO = new RegistrationResponseDTO();
        try {
            contestEntrantRepository.save(modelMapper.map(registrationRequestDTO, ContestEntrant.class));
        } catch (Exception e) {
            log.error("Unable to register user {}, error: {}", registrationRequestDTO.getEmail(), e.getMessage());
            registrationResponseDTO.setErrorMessages(Set.of(e.getMessage()));
        }
        return registrationResponseDTO;
    }

    public DrawResultDTO getWinners(int number) {
        // TODO validate number 0-9
        // TODO validate current time
        // TODO perform draw
        List<WinnerDTO> winnersList = new ArrayList<>();
        winnersList.add(WinnerDTO.builder().email("someEmail@emailProvider.com").drawId(231939).fullname("Some Email").build());
        winnersList.add(WinnerDTO.builder().email("someOtherEmail@emailProvider.com").drawId(5995859).fullname("Some Other Email").build());

        return DrawResultDTO.builder()
                .idx(number)
                .drawDate("dd/MM/yyyy HH:mm:ss TT")
                .winnersList(winnersList)
                .build();
    }

    public long getTotalParticipants() {
        return contestEntrantRepository.count();
    }


}
