package com.locdevz.nhamaynuoc.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "kho_cxl")
public class KhoCXL {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //    private String KId;
    private String nameK;
    @Column(unique = true)
    private String WTId;
    private String status;
}
