package com.locdevz.nhamaynuoc.backend.services.Impl;

import com.locdevz.nhamaynuoc.backend.models.KhoCNCN;
import com.locdevz.nhamaynuoc.backend.models.KhoCNDH;
import com.locdevz.nhamaynuoc.backend.repository.KhoCNCNRepository;
import com.locdevz.nhamaynuoc.backend.services.service.KhoCNCNService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KhoCNCNServiceImpl implements KhoCNCNService {
    @Autowired
    KhoCNCNRepository khoCNCNRepository;

    @Override
    public List<KhoCNCN> getAllDataFromKhoCNCN() {
        return khoCNCNRepository.findAll();
    }

    @Override
    public KhoCNCN createDataForKhoCNCN(KhoCNCN khoCNCN) {
        return khoCNCNRepository.save(khoCNCN);
    }

    @Override
    public KhoCNCN updateDataForKhoCNCN(Long id, KhoCNCN khoCNCN) {
        Optional<KhoCNCN> khoCNCNs = khoCNCNRepository.findById(id);
        if(khoCNCNs.isPresent()){
            khoCNCN.setId(id);
        }
        return null;
    }

    @Override
    public void deleteDataFromCNCN(Long id) {
        khoCNCNRepository.deleteById(id);
    }
}
