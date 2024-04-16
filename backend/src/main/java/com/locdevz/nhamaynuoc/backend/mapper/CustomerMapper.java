package com.locdevz.nhamaynuoc.backend.mapper;

import com.locdevz.nhamaynuoc.backend.dto.CustomerDTO;
import com.locdevz.nhamaynuoc.backend.models.Customer;

public class CustomerMapper {
    public static CustomerDTO convertToDto(Customer customer) {
        CustomerDTO dto = new CustomerDTO();
        dto.setId(customer.getId());
        dto.setCustomerId(customer.getCustomerId());
        dto.setCustomerName(customer.getCustomerName());
        dto.setCustomerPhoneNumber(customer.getCustomerPhoneNumber());
        dto.setCustomerAddress(customer.getCustomerAddress());
        dto.setReadBook(customer.getReadBook());
        if (customer.getWaterMeter() != null) {
            dto.setWaterMeterId(customer.getWaterMeter().getId());
        }
        return dto;
    }
}
