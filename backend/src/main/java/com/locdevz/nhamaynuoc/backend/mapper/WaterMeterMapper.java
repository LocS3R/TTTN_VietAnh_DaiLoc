package com.locdevz.nhamaynuoc.backend.mapper;

import com.locdevz.nhamaynuoc.backend.dto.WaterMeterDto;
import com.locdevz.nhamaynuoc.backend.models.WaterMeter;

public class WaterMeterMapper {
    public static WaterMeterDto mapToWaterMeterDto(WaterMeter waterMeter) {
        return new WaterMeterDto(
                waterMeter.getId(),
                waterMeter.getWTId(),
                waterMeter.getWTSerial(),
                waterMeter.isIsActive(),
                waterMeter.getUsedAt()
        );
    }
}
