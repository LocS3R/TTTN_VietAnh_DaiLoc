package com.locdevz.nhamaynuoc.backend.mapper;

import com.locdevz.nhamaynuoc.backend.dto.FeedBackDto;
import com.locdevz.nhamaynuoc.backend.models.FeedBack;

public class FeedBackMapper {
    public static FeedBackDto mapToFeedBackDto(FeedBack feedBack) {
        FeedBackDto feedBackDto = new FeedBackDto();
        feedBackDto.setId(feedBack.getId());
        feedBackDto.setDetails(feedBack.getDetails());
        if (feedBack.getCustomer() != null) {
            feedBackDto.setCustomerId(feedBack.getCustomer().getId());
        }
        feedBackDto.setStatus(feedBack.getStatus());
        return feedBackDto;
    }
}
