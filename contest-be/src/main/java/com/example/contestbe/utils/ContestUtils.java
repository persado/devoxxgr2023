package com.example.contestbe.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;

@Component
public class ContestUtils {

    @Value("${contest.start-date-validation:true}")
    private Boolean contestStartDateValidation;

    public Set<String> validateContestOpening() {
        Set<String> errorMessages = new HashSet<>();

        if (contestStartDateValidation) {
            String contestStartDate = "05/05/2023 18:20";
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
//            ZonedDateTime dateTime = LocalDateTime.parse(contestStartDate, formatter).atZone(ZoneId.of("Europe/Athens"));
            LocalDateTime dateTime = LocalDateTime.parse(contestStartDate, formatter);

//            ZonedDateTime now = LocalDateTime.now().atZone(ZoneId.of("Europe/Athens"));
            LocalDateTime now = LocalDateTime.now();

            if (now.isBefore(dateTime)) {
                Duration duration = Duration.between(now, dateTime);
                errorMessages.add(String.format("Api not available yet! Draw will be available in %s days, %s hours, %s minutes", duration.toDaysPart(), duration.toHoursPart(), duration.toMinutesPart()));
            }
        }

        return errorMessages;
    }
}
