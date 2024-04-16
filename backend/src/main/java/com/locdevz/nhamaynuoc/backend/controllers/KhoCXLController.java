package com.locdevz.nhamaynuoc.backend.controllers;

import com.locdevz.nhamaynuoc.backend.models.KhoCXL;
import com.locdevz.nhamaynuoc.backend.services.Impl.KhoCXLServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/khocxl")
public class KhoCXLController {
    @Autowired
    KhoCXLServiceImpl khoCXLService;

    @GetMapping
    public List<KhoCXL> getAllData() {
        return khoCXLService.getAllDataFromKho();
    }

    @PostMapping
    public KhoCXL createData(KhoCXL khoCXL) {
        return khoCXLService.createDataForKho(khoCXL);
    }
}
