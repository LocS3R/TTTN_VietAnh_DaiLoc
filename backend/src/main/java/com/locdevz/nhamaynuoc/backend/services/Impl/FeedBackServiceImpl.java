package com.locdevz.nhamaynuoc.backend.services.Impl;

import com.locdevz.nhamaynuoc.backend.dto.FeedBackAdminDto;
import com.locdevz.nhamaynuoc.backend.dto.FeedBackDto;
import com.locdevz.nhamaynuoc.backend.mapper.FeedBackMapper;
import com.locdevz.nhamaynuoc.backend.models.FeedBack;
import com.locdevz.nhamaynuoc.backend.repository.FeedBackRepository;
import com.locdevz.nhamaynuoc.backend.services.service.FeedBackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FeedBackServiceImpl implements FeedBackService {

    @Autowired
    private FeedBackRepository feedBackRepository;

    @Override
    public List<FeedBackDto> getAllFeedBack() {
        List<FeedBack> feedBacks = feedBackRepository.findAll();
        return feedBacks.stream()
                .map(this::mapToFeedBackDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<FeedBackAdminDto> getAllFeedBackAsAdmin() {
        List<FeedBack> feedBacks = feedBackRepository.findAll();
        return feedBacks.stream()
                .map(this::mapToFeedBackAdminDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<FeedBackDto> getFeedBackById(Long id) {
        Optional<FeedBack> feedBack = feedBackRepository.findById(id);
        return feedBack.map(FeedBackMapper::mapToFeedBackDto);
    }

    @Override
    public List<FeedBackDto> getAllFeedBackByCustomerId(Long customerId) {
        List<FeedBack> feedBacks = feedBackRepository.findAllByCustomerId(customerId);
        return feedBacks.stream().map(this::mapToFeedBackDto).collect(Collectors.toList());
    }

    private FeedBackDto mapToFeedBackDto(FeedBack feedBack) {
        FeedBackDto feedBackDto = new FeedBackDto();
        feedBackDto.setId(feedBack.getId());
        feedBackDto.setDetails(feedBack.getDetails());
        if (feedBack.getCustomer() != null) {
            feedBackDto.setCustomerId(feedBack.getCustomer().getId());
        }
        feedBackDto.setStatus(feedBack.getStatus());
        return feedBackDto;
    }

    private FeedBackAdminDto mapToFeedBackAdminDto(FeedBack feedBack) {
        FeedBackAdminDto feedBackAdminDto = new FeedBackAdminDto();
        feedBackAdminDto.setId(feedBack.getId());
        feedBackAdminDto.setDetails(feedBack.getDetails());
        if (feedBack.getCustomer() != null) {
            feedBackAdminDto.setCustomerId(feedBack.getCustomer().getId());
            feedBackAdminDto.setCustomerName(feedBack.getCustomer().getCustomerName());
            feedBackAdminDto.setCustomerAddress(feedBack.getCustomer().getCustomerAddress());
        }
        feedBackAdminDto.setStatus(feedBack.getStatus());
        return feedBackAdminDto;
    }

    @Override
    public FeedBack createOrUpdate(FeedBack feedBack) {
        return feedBackRepository.save(feedBack);
    }

    @Override
    public FeedBack updateStatus(Long id, String status) {
        Optional<FeedBack> feedBack = feedBackRepository.findById(id);
        feedBack.ifPresent(back -> back.setStatus(status));
        return feedBackRepository.save(feedBack.get());
    }

    @Override
    public void deleteFeedBack(Long id) {
        feedBackRepository.deleteById(id);
    }
}
