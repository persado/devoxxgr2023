package com.example.contestbe.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RegistrationRequestDTO {
    @NotBlank(message = "Email is mandatory")
    @Size(max = 80, message = "Email must be 80 chars max")
    private String email;
    @NotBlank(message = "Full name is mandatory")
    @Size(max = 200, message = "Full name must be 200 chars max")
    private String fullname;
    private String stack;
    private Boolean canContact;
    private String hash;
}
