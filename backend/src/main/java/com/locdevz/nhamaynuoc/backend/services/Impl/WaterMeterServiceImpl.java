package com.locdevz.nhamaynuoc.backend.services.Impl;

import com.locdevz.nhamaynuoc.backend.dto.WaterMeterDto;
import com.locdevz.nhamaynuoc.backend.mapper.WaterMeterMapper;
import com.locdevz.nhamaynuoc.backend.models.WaterMeter;
import com.locdevz.nhamaynuoc.backend.repository.WaterMeterRepository;
import com.locdevz.nhamaynuoc.backend.services.service.WaterMeterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WaterMeterServiceImpl implements WaterMeterService {

    @Autowired
    private WaterMeterRepository waterMeterRepository;

    @Override
    public List<WaterMeter> getAllWaterMeters() {
        return waterMeterRepository.findAll();
    }

    @Override
    public Optional<WaterMeterDto> getWaterMeterById(Long id) {
        Optional<WaterMeter> waterMeter = waterMeterRepository.findById(id);
        return Optional.of(WaterMeterMapper.mapToWaterMeterDto(waterMeter.get()));
    }

    @Override
    public List<WaterMeterDto> getAllWaterMeterByWTIdContaining(String WTId) {
        List<WaterMeter> waterMeters = new ArrayList<>();
        if (WTId == null) {
            waterMeters.addAll(waterMeterRepository.findAll());
        } else {
            waterMeters.addAll(waterMeterRepository.findAllByWTIdContaining(WTId));
        }
        return waterMeters.stream()
                .map(WaterMeterMapper::mapToWaterMeterDto)
                .collect(Collectors.toList());
    }

    @Override
    public WaterMeter createOrUpdateWaterMeter(WaterMeter waterMeter) {
        return waterMeterRepository.save(waterMeter);
    }

    @Override
    public WaterMeter findWaterMeterByWTSerial(String WTSerial) {
        return waterMeterRepository.findByWTSerial(WTSerial);
    }

    @Override
    public List<WaterMeter> getAllWaterMeterByIsActive(boolean IsActive) {
        return waterMeterRepository.findAllByIsActive(IsActive);
    }

    @Override
    public List<String> getAllSerial() {
        return waterMeterRepository.findAllSerial();
    }

    @Override
    public void deleteWaterMeter(Long id) {
        waterMeterRepository.deleteById(id);
    }
}
