package com.locdevz.nhamaynuoc.backend.controllers;

import com.locdevz.nhamaynuoc.backend.models.KhoCNCN;
import com.locdevz.nhamaynuoc.backend.services.Impl.KhoCNCNServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/khocncn")
public class KhoCNCNController {
    @Autowired
    private KhoCNCNServiceImpl khoCNCNService;

    @GetMapping
    public List<KhoCNCN> getAllData() {
        return khoCNCNService.getAllDataFromKhoCNCN();
    }

    @PostMapping
    public KhoCNCN createrDataForKhoCNCN(@RequestBody KhoCNCN khoCNCN) {
        return khoCNCNService.createDataForKhoCNCN(khoCNCN);
    }

    @PutMapping("/{id}")
    public ResponseEntity<KhoCNCN> updatetDataForWhoCNCN(@PathVariable Long id, KhoCNCN khoCNCN) {
        khoCNCN.setId(id);
        KhoCNCN khoCNCNs = khoCNCNService.createDataForKhoCNCN(khoCNCN);
        return ResponseEntity.ok().body(khoCNCNs);
    }


}
