package com.locdevz.nhamaynuoc.backend.services.service;

import com.locdevz.nhamaynuoc.backend.models.KhoCOTY;

import java.util.List;

public interface KhoCOTYService {

    List<KhoCOTY> getAllKhoCOTY();

    KhoCOTY createKhoCOTY(KhoCOTY khoCOTY);

    KhoCOTY updateKhoCOTY(String WTId, KhoCOTY khoCOTY);

    void moveDataToKhoCNDH(List<Long> id);

    void deleteKhoCOTYById(Long id);

}
