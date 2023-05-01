package com.example.contestbe.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WinnerDTO {
    private String email;
    private String fullname;
    private Long drawId;
}
