package com.locdevz.nhamaynuoc.backend.repository;

import com.locdevz.nhamaynuoc.backend.models.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedBackRepository extends JpaRepository<FeedBack, Long> {
    @Query("SELECT f FROM FeedBack f WHERE f.customer.id = :customerId")
    List<FeedBack> findAllByCustomerId(Long customerId);
}
