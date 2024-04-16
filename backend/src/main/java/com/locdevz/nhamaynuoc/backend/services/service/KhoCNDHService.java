package com.locdevz.nhamaynuoc.backend.services.service;

import com.locdevz.nhamaynuoc.backend.models.KhoCNDH;

import java.util.List;

public interface KhoCNDHService {
    List<KhoCNDH> getAllDataFromKho();

    KhoCNDH createDataForKho(KhoCNDH khoCNDH);

    KhoCNDH updateResultCheck(Long id, KhoCNDH khoCNDH);

    KhoCNDH updateResultSuccess(Long id);

    KhoCNDH updateResultFailed(Long id);

    KhoCNDH updateResultReload(Long id);

    void moveDataToKhoCNCN(List<Long> id, String nameK);

    void deleteDataFromKho(Long id);
}
