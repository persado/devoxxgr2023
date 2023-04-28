package com.example.contestbe.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RegistrationRequestDTO {
    private String email;
    private String fullname;
    private String stack;
    private Boolean canContact;
    private String hash;
}
