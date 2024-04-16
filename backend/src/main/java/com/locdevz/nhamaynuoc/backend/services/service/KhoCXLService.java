package com.locdevz.nhamaynuoc.backend.services.service;


import com.locdevz.nhamaynuoc.backend.models.KhoCXL;

import java.util.List;

public interface KhoCXLService {
    List<KhoCXL> getAllDataFromKho();
    KhoCXL createDataForKho(KhoCXL khoCXL);
}
