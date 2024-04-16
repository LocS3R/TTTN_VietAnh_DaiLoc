package com.locdevz.nhamaynuoc.backend.services.service;

import com.locdevz.nhamaynuoc.backend.dto.FeedBackAdminDto;
import com.locdevz.nhamaynuoc.backend.dto.FeedBackDto;
import com.locdevz.nhamaynuoc.backend.models.FeedBack;

import java.util.List;
import java.util.Optional;

public interface FeedBackService {
    List<FeedBackDto> getAllFeedBack();

    List<FeedBackAdminDto> getAllFeedBackAsAdmin();

    Optional<FeedBackDto> getFeedBackById(Long id);

    List<FeedBackDto> getAllFeedBackByCustomerId(Long customerId);

    FeedBack createOrUpdate(FeedBack feedBack);

    FeedBack updateStatus(Long id, String status);

    void deleteFeedBack(Long id);
}
