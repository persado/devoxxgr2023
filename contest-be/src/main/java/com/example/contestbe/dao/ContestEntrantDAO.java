package com.example.contestbe.dao;

import com.example.contestbe.dto.DrawResultDTO;
import com.example.contestbe.dto.RegistrationRequestDTO;
import com.example.contestbe.dto.ResponseDTO;
import com.example.contestbe.dto.WinnerDTO;
import com.example.contestbe.entity.ContestEntrant;
import com.example.contestbe.repository.ContestEntrantRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;


@RequiredArgsConstructor
@Service
@Slf4j
public class ContestEntrantDAO {

    private final ContestEntrantRepository contestEntrantRepository;
    private final ModelMapper modelMapper;

    public ResponseDTO save(RegistrationRequestDTO registrationRequestDTO) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            contestEntrantRepository.save(modelMapper.map(registrationRequestDTO, ContestEntrant.class));
        } catch (Exception e) {
            log.error("Unable to register user {}, error: {}", registrationRequestDTO.getEmail(), e.getMessage());
            responseDTO.setErrorMessages(Set.of(e.getMessage()));
        }
        return responseDTO;
    }

    @Transactional
    public DrawResultDTO performDrawAndGetResults(int idx) {
        if (canPerformDraw()) {
            // Perform draw
            performDraw(idx);
        }
        return getDrawResults();
    }

    public long getTotalParticipants() {
        return contestEntrantRepository.count();
    }

    private boolean canPerformDraw() {
        return contestEntrantRepository.countByIdxIsNotNull() == 0;
    }

    public DrawResultDTO getDrawResults() {
        List<ContestEntrant> contestEntrants = contestEntrantRepository.findTop20ByDrawIdIsNotNullOrderByDrawIdAsc();

        if (!contestEntrants.isEmpty()) {
            List<WinnerDTO> winnersList = modelMapper.map(contestEntrants, new TypeToken<List<WinnerDTO>>() {}.getType());

            LocalDateTime ldt = LocalDateTime.ofInstant(contestEntrants.get(0).getDrawDate(), ZoneId.of("Europe/Athens"));
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

            return DrawResultDTO.builder()
                    .idx(contestEntrants.get(0).getIdx())
                    .drawDate(ldt.format(formatter))
                    .winnersList(winnersList)
                    .build();
        }

        return DrawResultDTO.builder()
                .build();

    }

    @Transactional
    public void performDraw(int idx) {

        List<ContestEntrant> contestEntrants = contestEntrantRepository.findAll();
        contestEntrants.forEach(
                contestEntrant -> {
                    String md5subString = contestEntrant.getHash().substring(idx, idx + 8);
                    Long drawId = Long.parseLong(md5subString, 16);

                    contestEntrant.setIdx(idx);
                    contestEntrant.setDrawId(drawId);
                    contestEntrant.setDrawDate(Instant.now());

                    contestEntrantRepository.saveAndFlush(contestEntrant);
                }
        );
    }


}
