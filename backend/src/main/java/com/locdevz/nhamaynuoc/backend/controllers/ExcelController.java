package com.locdevz.nhamaynuoc.backend.controllers;

import com.locdevz.nhamaynuoc.backend.helper.ExcelHelper;
import com.locdevz.nhamaynuoc.backend.message.ResponseMessage;
import com.locdevz.nhamaynuoc.backend.models.KhoCOTY;
import com.locdevz.nhamaynuoc.backend.services.Impl.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/excel")
public class ExcelController {
    @Autowired
    private ExcelService excelService;

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            excelService.processExcelFile(file);
            return "File uploaded successfully";
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload file: " + e.getMessage();
        }
    }
}
