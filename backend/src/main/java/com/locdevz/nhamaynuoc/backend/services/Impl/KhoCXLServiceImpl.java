package com.locdevz.nhamaynuoc.backend.services.Impl;

import com.locdevz.nhamaynuoc.backend.models.KhoCXL;
import com.locdevz.nhamaynuoc.backend.repository.KhoCXLRepository;
import com.locdevz.nhamaynuoc.backend.services.service.KhoCXLService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KhoCXLServiceImpl implements KhoCXLService {
    @Autowired
    private KhoCXLRepository khoCXLRepository;

    @Override
    public List<KhoCXL> getAllDataFromKho() {
        return khoCXLRepository.findAll();
    }

    @Override
    public KhoCXL createDataForKho(KhoCXL khoCXL) {
        return khoCXLRepository.save(khoCXL);
    }
}
