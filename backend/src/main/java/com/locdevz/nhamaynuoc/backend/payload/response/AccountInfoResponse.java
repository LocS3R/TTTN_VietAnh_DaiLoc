package com.locdevz.nhamaynuoc.backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@AllArgsConstructor
public class AccountInfoResponse {
    @Setter
    private Long id;
    @Setter
    private String username;
    private List<String> roles;
}
