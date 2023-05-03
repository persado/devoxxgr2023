package com.example.contestbe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class ContestBeApplication {

    public static void main(String[] args) {
        java.util.TimeZone.setDefault(TimeZone.getTimeZone("Europe/Athens"));
        SpringApplication.run(ContestBeApplication.class, args);
    }

}
