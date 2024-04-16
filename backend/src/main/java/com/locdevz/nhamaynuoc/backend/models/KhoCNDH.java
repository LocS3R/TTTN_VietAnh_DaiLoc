package com.locdevz.nhamaynuoc.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "kho_cndh")
public class KhoCNDH {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String WTId;
    private String status;
    private LocalDate dateToCheck;
    private LocalDate expCheck;
    private String groupCheck;
    private String result;
}
