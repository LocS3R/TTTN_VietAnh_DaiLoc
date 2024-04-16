package com.locdevz.nhamaynuoc.backend.controllers;

import com.locdevz.nhamaynuoc.backend.models.KhoCOTY;
import com.locdevz.nhamaynuoc.backend.services.Impl.KhoCOTYServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/khocoty")
public class KhoCOTYController {
    @Autowired
    private KhoCOTYServiceImpl khoCOTYService;

    @GetMapping
    public List<KhoCOTY> getAllKhoCOTY() {
        return khoCOTYService.getAllKhoCOTY();
    }

    @PostMapping("/movetocndh")
    public void moveDataFromCotyToCNDN(@RequestBody List<Long> id) {
        khoCOTYService.moveDataToKhoCNDH(id);
    }

    @DeleteMapping("/{id}")
    public void deleteKhoCOTY(@PathVariable Long id) {
        khoCOTYService.deleteKhoCOTYById(id);
    }

}
