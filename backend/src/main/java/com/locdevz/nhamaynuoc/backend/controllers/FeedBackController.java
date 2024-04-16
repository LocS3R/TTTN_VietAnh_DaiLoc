package com.locdevz.nhamaynuoc.backend.controllers;

import com.locdevz.nhamaynuoc.backend.dto.FeedBackAdminDto;
import com.locdevz.nhamaynuoc.backend.dto.FeedBackDto;
import com.locdevz.nhamaynuoc.backend.models.FeedBack;
import com.locdevz.nhamaynuoc.backend.services.service.FeedBackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedBackController {

    @Autowired
    private FeedBackService feedBackService;

    @GetMapping
    public ResponseEntity<List<FeedBackDto>> getAllFeedBacks() {
        List<FeedBackDto> feedBackDto = feedBackService.getAllFeedBack();
        if (!feedBackDto.isEmpty()) {
            return new ResponseEntity<>(feedBackDto, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }

    @GetMapping("/fam")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<List<FeedBackAdminDto>> setAllFeedBackForAdmin() {
//        List<FeedBack> feedBacks =
        List<FeedBackAdminDto> feedBackAdminDtos = feedBackService.getAllFeedBackAsAdmin();
        if (!feedBackAdminDtos.isEmpty()) {
            return new ResponseEntity<>(feedBackAdminDtos, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeedBackDto> getFeedBackById(@PathVariable Long id) {
        Optional<FeedBackDto> feedBackDto = feedBackService.getFeedBackById(id);
        return feedBackDto.map(value -> ResponseEntity.ok().body(value))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/cus/{customerId}")
    public ResponseEntity<List<FeedBackDto>> getAllFeedBackFlowCustomer(@PathVariable Long customerId) {
        List<FeedBackDto> feedBackDtos = feedBackService.getAllFeedBackByCustomerId(customerId);
        if (!feedBackDtos.isEmpty()) {
            return new ResponseEntity<>(feedBackDtos, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }

    @PostMapping
    public ResponseEntity<FeedBack> createFeedBack(@RequestBody FeedBack feedBack) {
        FeedBack createdFeeBack = feedBackService.createOrUpdate(feedBack);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFeeBack);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeedBack> updateFeedBack(@PathVariable Long id, @RequestBody FeedBack feedBack) {
        feedBack.setId(id);
        FeedBack updatedFeedBack = feedBackService.createOrUpdate(feedBack);
        return ResponseEntity.ok().body(updatedFeedBack);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFeedBack(@PathVariable Long id) {
        feedBackService.deleteFeedBack(id);
        return ResponseEntity.noContent().build();
    }
}
