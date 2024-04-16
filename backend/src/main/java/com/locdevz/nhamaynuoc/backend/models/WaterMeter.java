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
@Table(name = "watermeter")
public class WaterMeter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "wtid", nullable = false)
    private String WTId;

    @Column(name = "wtserial", unique = true, nullable = false)
    private String WTSerial;

    @Column(name = "isactive")
    private boolean IsActive = false;

    private LocalDate usedAt;

    @OneToOne(mappedBy = "waterMeter", cascade = CascadeType.ALL)
    private Customer customer;
}
