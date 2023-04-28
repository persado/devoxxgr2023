package com.example.contestbe.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class DrawResultDTO {
    private String drawDate;
    private Integer idx;
    private List<WinnerDTO> winnersList;
}
