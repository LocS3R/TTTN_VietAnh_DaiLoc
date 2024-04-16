package com.locdevz.nhamaynuoc.backend.repository;

import com.locdevz.nhamaynuoc.backend.models.WaterMeter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WaterMeterRepository extends JpaRepository<WaterMeter, Long> {
    WaterMeter findByWTSerial(String WTSerial);
    @Query("SELECT wm FROM WaterMeter wm WHERE wm.IsActive = ?1")
    List<WaterMeter> findAllByIsActive(boolean IsActive);

    @Query("SELECT wm.WTSerial FROM WaterMeter wm")
    List<String> findAllSerial();

    List<WaterMeter> findAllByWTIdContaining(String WTId);
}
