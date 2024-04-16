package com.locdevz.nhamaynuoc.backend.services.service;

import com.locdevz.nhamaynuoc.backend.models.KhoCNCN;

import java.util.List;

public interface KhoCNCNService {
    List<KhoCNCN> getAllDataFromKhoCNCN();

    KhoCNCN createDataForKhoCNCN(KhoCNCN khoCNCN);

    KhoCNCN updateDataForKhoCNCN(Long id, KhoCNCN khoCNCN);


    void deleteDataFromCNCN(Long id);
}
