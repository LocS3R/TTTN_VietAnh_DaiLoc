package com.locdevz.nhamaynuoc.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customerid", unique = true, nullable = false)
    private String customerId;

    @Column(name = "customername", nullable = false)
    private String customerName;

    @Column(name = "customerphonenumber", unique = true, nullable = false)
    private String customerPhoneNumber;
    @Column(name = "customeraddress", nullable = false)
    private String customerAddress;
    @Column(name = "numberreadbook", nullable = false)
    private String readBook;

    private Boolean isActiveAccount = false;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "water_meter_id")
    private WaterMeter waterMeter;

    private Long getWaterMeterId() {
        if (getWaterMeter() != null) {
            return getWaterMeter().getId();
        }
        return null; // hoặc một giá trị mặc định khác tùy thuộc vào yêu cầu của bạn
    }
}
