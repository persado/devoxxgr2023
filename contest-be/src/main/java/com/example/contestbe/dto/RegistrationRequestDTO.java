package com.example.contestbe.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RegistrationRequestDTO {
    private String email;
    private String name;
    private String stack;
    private Boolean openToWork;
    private String md5Hex;
}
