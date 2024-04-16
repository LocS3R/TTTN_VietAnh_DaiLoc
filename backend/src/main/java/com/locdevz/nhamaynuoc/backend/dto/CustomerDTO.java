package com.locdevz.nhamaynuoc.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
    private Long id;
    private String customerId;
    private String customerName;
    private String customerPhoneNumber;
    private String customerAddress;
    private String readBook;
//    private Boolean isActiveAccount;
    private Long waterMeterId;
}

