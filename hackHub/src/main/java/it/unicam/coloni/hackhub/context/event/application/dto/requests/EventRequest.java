package it.unicam.coloni.hackhub.context.event.application.dto.requests;

import lombok.Data;


import java.time.LocalDate;

@Data
public abstract class EventRequest {

    private String name;

    @com.fasterxml.jackson.annotation.JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @com.fasterxml.jackson.annotation.JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    private String rulesUrl;
}
