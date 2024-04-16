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
@Table(name = "dmk")
public class DMK {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String codeK;

    private String nameK;

    @ManyToOne
    @JoinColumn(name = "dmdvql_id")
    private DMDVQL dmdvql;

    private String status;
}
