package com.locdevz.nhamaynuoc.backend.repository;

import com.locdevz.nhamaynuoc.backend.models.KhoCOTY;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KhoCOTYRepository extends JpaRepository<KhoCOTY, Long> {
    KhoCOTY findByWTId(String WTId);
}
