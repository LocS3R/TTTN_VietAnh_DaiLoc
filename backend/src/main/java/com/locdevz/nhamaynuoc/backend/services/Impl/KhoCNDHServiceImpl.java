package com.locdevz.nhamaynuoc.backend.services.Impl;

import com.locdevz.nhamaynuoc.backend.models.KhoCNCN;
import com.locdevz.nhamaynuoc.backend.models.KhoCNDH;
import com.locdevz.nhamaynuoc.backend.repository.KhoCNCNRepository;
import com.locdevz.nhamaynuoc.backend.repository.KhoCNDHRepository;
import com.locdevz.nhamaynuoc.backend.services.service.KhoCNDHService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class KhoCNDHServiceImpl implements KhoCNDHService {
    @Autowired
    private KhoCNDHRepository khoCNDHRepository;

    @Autowired
    private KhoCNCNRepository khoCNCNRepository;

    @Override
    public List<KhoCNDH> getAllDataFromKho() {
        return khoCNDHRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @Override
    public KhoCNDH createDataForKho(KhoCNDH khoCNDH) {
        return khoCNDHRepository.save(khoCNDH);
    }

    @Override
    public KhoCNDH updateResultCheck(Long id, KhoCNDH khoCNDH) {
        Optional<KhoCNDH> foundKhoCNDH = khoCNDHRepository.findById(id);
//        KhoCNDH updateObj = new KhoCNDH();
        if (foundKhoCNDH.isPresent()) {
            KhoCNDH item = foundKhoCNDH.get();
            if (item.getResult().trim().equals("D")) {
                LocalDate today = LocalDate.now();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM_yyyy");
                LocalDate expCheckDate = today.plusMonths(60);
                String formattedDate = expCheckDate.format(formatter);
                String newWTId = item.getWTId() + "_" + formattedDate;
                item.setDateToCheck(today);
                item.setExpCheck(expCheckDate);
                item.setGroupCheck(formattedDate + "_D");
                item.setStatus("MDKD_PENDING");
                item.setWTId(newWTId);
                return khoCNDHRepository.save(item);
            }
//            else if(item.getResult().trim().equals("KD")){
//
//            }
        }
        return null;
    }

    @Override
    public KhoCNDH updateResultSuccess(Long id) {
        Optional<KhoCNDH> khoCNDH = khoCNDHRepository.findById(id);
        if (khoCNDH.isPresent()) {
            khoCNDH.get().setResult("D");
            LocalDate today = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM_yyyy");
            LocalDate expCheckDate = today.plusMonths(60);
            String formattedDate = expCheckDate.format(formatter);
            String newWTId = khoCNDH.get().getWTId() + "_" + formattedDate;
            khoCNDH.get().setDateToCheck(today);
            khoCNDH.get().setExpCheck(expCheckDate);
            khoCNDH.get().setGroupCheck(formattedDate + "_D");
            khoCNDH.get().setStatus("CNDH_MDKD");
            khoCNDH.get().setWTId(newWTId);
            return khoCNDHRepository.save(khoCNDH.get());
        }
        return null;
    }

    @Override
    public KhoCNDH updateResultFailed(Long id) {
        Optional<KhoCNDH> khoCNDH = khoCNDHRepository.findById(id);
        if (khoCNDH.isPresent()) {
            khoCNDH.get().setResult("KD");
            LocalDate today = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM_yyyy");
            LocalDate expCheckDate = today.plusMonths(60);
            String formattedDate = expCheckDate.format(formatter);
//            String newWTId = khoCNDH.get().getWTId() + "_" + formattedDate;
            khoCNDH.get().setDateToCheck(today);
//            khoCNDH.get().setExpCheck(expCheckDate);
            khoCNDH.get().setGroupCheck(formattedDate + "_D");
            khoCNDH.get().setStatus("CXL");
//            khoCNDH.get().setWTId(newWTId);
            return khoCNDHRepository.save(khoCNDH.get());
        }
        return null;
    }

    @Override
    public KhoCNDH updateResultReload(Long id) {
        Optional<KhoCNDH> khoCNDH = khoCNDHRepository.findById(id);
        if (khoCNDH.isPresent()) {
            khoCNDH.get().setResult("KDL");
            khoCNDH.get().setStatus("CNDH_MCKD");
            return khoCNDHRepository.save(khoCNDH.get());
        }
        return null;
    }

    @Override
    public void moveDataToKhoCNCN(List<Long> id, String nameK) {
        for (Long rowId : id) {
            Optional<KhoCNDH> khoCNDH = khoCNDHRepository.findById(rowId);
            if (khoCNDH.isPresent()) {
                KhoCNDH cndhData = khoCNDH.get();
                KhoCNCN khoCNCN = new KhoCNCN();
                khoCNCN.setNameK("CNCN_" + nameK);
                khoCNCN.setWTId(nameK + "_" + cndhData.getWTId());
                String oldStatus = cndhData.getStatus().split("_")[1];
                String newStatus =  "CNCN_" + oldStatus;
                khoCNCN.setStatus(newStatus);
                khoCNCNRepository.save(khoCNCN);
                khoCNDHRepository.deleteById(rowId);
            }
        }
    }

    @Override
    public void deleteDataFromKho(Long id) {

    }
}
