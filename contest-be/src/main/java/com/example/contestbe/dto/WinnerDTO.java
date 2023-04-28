package com.example.contestbe.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class WinnerDTO {
    private String email;
    private String fullname;
    private Integer drawId;
}
