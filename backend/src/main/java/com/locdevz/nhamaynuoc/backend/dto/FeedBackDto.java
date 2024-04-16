package com.locdevz.nhamaynuoc.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedBackDto {
    private Long id;
    private String details;
    private Long customerId;
    private String status;
}
