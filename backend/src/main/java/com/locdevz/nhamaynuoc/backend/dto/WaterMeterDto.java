package com.locdevz.nhamaynuoc.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WaterMeterDto {
    private Long id;
    private String WTId;
    private String WTSerial;
    private boolean IsActive;
    private LocalDate usedAt;
//    private String customerId;
}
