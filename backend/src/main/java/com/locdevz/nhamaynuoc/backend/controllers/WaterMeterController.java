package com.locdevz.nhamaynuoc.backend.controllers;

import com.locdevz.nhamaynuoc.backend.dto.WaterMeterDto;
import com.locdevz.nhamaynuoc.backend.models.WaterMeter;
import com.locdevz.nhamaynuoc.backend.services.Impl.WaterMeterServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/watermeters")
public class WaterMeterController {
    @Autowired
    private WaterMeterServiceImpl waterMeterService;

    @GetMapping
    public List<WaterMeter> getAllWaterMeters() {
        return waterMeterService.getAllWaterMeters();
    }

    @GetMapping("/search")
    public ResponseEntity<List<WaterMeterDto>> getAllWaterMetersByWTId(@RequestParam(required = false) String WTId) {
        try {
            List<WaterMeterDto> waterMeterDtos = waterMeterService.getAllWaterMeterByWTIdContaining(WTId);
            if (waterMeterDtos.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(waterMeterDtos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/used")
    public List<WaterMeter> getAllWaterMeterUsed() {
        return waterMeterService.getAllWaterMeterByIsActive(true);
    }

    @GetMapping("/unused")
    public List<WaterMeter> getAllWaterMeterUnUsed() {
        return waterMeterService.getAllWaterMeterByIsActive(false);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WaterMeterDto> getWaterMeterById(@PathVariable Long id) {
        Optional<WaterMeterDto> waterMeter = waterMeterService.getWaterMeterById(id);
        return waterMeter.map(value -> ResponseEntity.ok().body(value))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("serials")
    public ResponseEntity<List<String>> getAllSerialOfWaterMeter() {
        List<String> allSerialWithId = new ArrayList<>();
        List<WaterMeter> allWaterMeter = waterMeterService.getAllWaterMeters();
        allWaterMeter.stream().map(waterMeter -> allSerialWithId.add(waterMeter.getWTSerial() + "-" + waterMeter.getWTId())).collect(Collectors.toList());
        return ResponseEntity.ok().body(allSerialWithId);
    }

    @GetMapping("serials/unused")
    public ResponseEntity<List<String>> getAllSerialOfWaterMeterUnused() {
        List<String> allSerialWithId = new ArrayList<>();
        List<WaterMeter> allWaterMeter = waterMeterService.getAllWaterMeterByIsActive(false);
        allWaterMeter.stream().map(waterMeter -> allSerialWithId.add(waterMeter.getWTSerial() + "-" + waterMeter.getWTId())).collect(Collectors.toList());
        return ResponseEntity.ok().body(allSerialWithId);
    }

    @GetMapping("serial/{WTSerial}")
    public ResponseEntity<?> getWaterMeterByWTSerial(@PathVariable String WTSerial) {
        WaterMeter waterMeter = waterMeterService.findWaterMeterByWTSerial(WTSerial);
        WaterMeter responseWaterMeter = new WaterMeter(
                waterMeter.getId(),
                waterMeter.getWTId(),
                waterMeter.getWTSerial(),
                waterMeter.isIsActive(),
                waterMeter.getUsedAt(),
                null
        );
        return ResponseEntity.ok().body(responseWaterMeter);
    }

    @PostMapping
    public ResponseEntity<WaterMeter> createWaterMeter(@RequestBody WaterMeter waterMeter) {
        WaterMeter createdWaterMeter = waterMeterService.createOrUpdateWaterMeter(waterMeter);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdWaterMeter);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WaterMeter> updateWaterMeter(@PathVariable Long id, @RequestBody WaterMeter waterMeter) {
        waterMeter.setId(id);
        WaterMeter updatedWaterMeter = waterMeterService.createOrUpdateWaterMeter(waterMeter);
        return ResponseEntity.ok().body(updatedWaterMeter);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWaterMeter(@PathVariable Long id) {
        waterMeterService.deleteWaterMeter(id);
        return ResponseEntity.noContent().build();
    }
}
