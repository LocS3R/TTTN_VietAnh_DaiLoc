package com.locdevz.nhamaynuoc.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dmdvql")
public class DMDVQL {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nameDV;

    private String codeDV;

    @OneToMany(mappedBy = "dmdvql")
    private List<DMK> dmks;
}
