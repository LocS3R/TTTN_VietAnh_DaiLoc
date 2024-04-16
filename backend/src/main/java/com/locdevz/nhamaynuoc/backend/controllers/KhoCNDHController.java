package com.locdevz.nhamaynuoc.backend.controllers;

import com.locdevz.nhamaynuoc.backend.models.KhoCNDH;
import com.locdevz.nhamaynuoc.backend.services.Impl.KhoCNDHServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/khocndh")
public class KhoCNDHController {
    @Autowired
    private KhoCNDHServiceImpl khoCNDHService;

    @GetMapping
    public List<KhoCNDH> geAllData() {
        return khoCNDHService.getAllDataFromKho();
    }

    @PostMapping
    public ResponseEntity<KhoCNDH> createData(@RequestBody KhoCNDH khoCNDH) {
        try {
            KhoCNDH savedKho = khoCNDHService.createDataForKho(khoCNDH);
            return new ResponseEntity<>(savedKho, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/success/{id}")
    public ResponseEntity<KhoCNDH> updateResSuccess(@PathVariable Long id) {
        try {
            KhoCNDH khoCNDH = khoCNDHService.updateResultSuccess(id);
            return new ResponseEntity<>(khoCNDH, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/failed/{id}")
    public ResponseEntity<KhoCNDH> updateResFailed(@PathVariable Long id) {
        try {
            KhoCNDH khoCNDH = khoCNDHService.updateResultFailed(id);
            return new ResponseEntity<>(khoCNDH, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/reload/{id}")
    public ResponseEntity<KhoCNDH> updateResReload(@PathVariable Long id) {
        try {
            KhoCNDH khoCNDH = khoCNDHService.updateResultReload(id);
            return new ResponseEntity<>(khoCNDH, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    @PostMapping("/movetocncn/{nameK}")
    public ResponseEntity<String> moveDataToKhoCNCN(@RequestBody List<Long> idList, @PathVariable String nameK) {
        try {
            khoCNDHService.moveDataToKhoCNCN(idList, nameK);
            return new ResponseEntity<>("Data moved successfully to KhoCNCN", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to move data to KhoCNCN", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
