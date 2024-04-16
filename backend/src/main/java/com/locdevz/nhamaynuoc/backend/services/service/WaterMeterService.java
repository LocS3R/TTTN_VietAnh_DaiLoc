package com.locdevz.nhamaynuoc.backend.services.service;

import com.locdevz.nhamaynuoc.backend.dto.WaterMeterDto;
import com.locdevz.nhamaynuoc.backend.models.WaterMeter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface WaterMeterService {
    List<WaterMeter> getAllWaterMeters();
    Optional<WaterMeterDto> getWaterMeterById(Long id);
    List<WaterMeterDto> getAllWaterMeterByWTIdContaining(String WTId);
    WaterMeter createOrUpdateWaterMeter(WaterMeter waterMeter);
    WaterMeter findWaterMeterByWTSerial(String WTSerial);
    List<WaterMeter> getAllWaterMeterByIsActive(boolean IsActive);
    List<String> getAllSerial();
    void deleteWaterMeter(Long id);
}
