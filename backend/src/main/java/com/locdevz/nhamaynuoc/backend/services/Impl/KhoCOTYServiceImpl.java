package com.locdevz.nhamaynuoc.backend.services.Impl;

import com.locdevz.nhamaynuoc.backend.models.KhoCNDH;
import com.locdevz.nhamaynuoc.backend.models.KhoCOTY;
import com.locdevz.nhamaynuoc.backend.repository.KhoCNDHRepository;
import com.locdevz.nhamaynuoc.backend.repository.KhoCOTYRepository;
import com.locdevz.nhamaynuoc.backend.services.service.KhoCOTYService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KhoCOTYServiceImpl implements KhoCOTYService {
    @Autowired
    private KhoCOTYRepository khoCOTYRepository;

    @Autowired
    private KhoCNDHRepository khoCNDHRepository;

    @Override
    public List<KhoCOTY> getAllKhoCOTY() {
        return khoCOTYRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @Override
    public KhoCOTY createKhoCOTY(KhoCOTY khoCOTY) {
        return khoCOTYRepository.save(khoCOTY);
    }

    @Override
    public KhoCOTY updateKhoCOTY(String WTId, KhoCOTY khoCOTY) {
        KhoCOTY foundKhoCOTY = khoCOTYRepository.findByWTId(WTId);
//        foundKhoCOTY.setKId(khoCOTY.getKId());
        foundKhoCOTY.setWTId(khoCOTY.getWTId());
        foundKhoCOTY.setNumberBox(khoCOTY.getNumberBox());
        foundKhoCOTY.setStatus(khoCOTY.getStatus());
        foundKhoCOTY.setNameK(khoCOTY.getNameK());
        return khoCOTYRepository.save(foundKhoCOTY);
    }

    @Override
    public void moveDataToKhoCNDH(List<Long> id) {
        for (Long rowId : id) {
            Optional<KhoCOTY> khoCOTYData = khoCOTYRepository.findById(rowId);
            if (khoCOTYData.isPresent()) {
                KhoCOTY khoCOTY = khoCOTYData.get();
                KhoCNDH khoCNDH = new KhoCNDH();
                khoCNDH.setWTId(khoCOTY.getWTId());
                khoCNDH.setStatus("CNDH_"+khoCOTY.getStatus());
                khoCNDHRepository.save(khoCNDH);
                khoCOTYRepository.deleteById(rowId);
            }
        }
    }

    @Override
    public void deleteKhoCOTYById(Long id) {
        khoCOTYRepository.deleteById(id);
    }
}
