package com.locdevz.nhamaynuoc.backend.services.service;

import com.locdevz.nhamaynuoc.backend.dto.CustomerDTO;
import com.locdevz.nhamaynuoc.backend.models.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    List<CustomerDTO> getAllCustomers();

    Optional<CustomerDTO> getCustomerById(Long id);

    Boolean getIsActiveAccountByCustomerId(String customerId);

    Boolean getIsActiveAccountByPhoneNumber(String customerPhoneNumber);

    Customer getCustomerByPhoneNumber(String customerPhoneNumber);

    Customer createOrUpdateCustomer(Customer customer);

    Boolean checkExistsCustomer(String customerId);

    Boolean checkExistsCustomerByPhoneNumber(String customerPhoneNumber);

//    Customer updateActiveAccount(String customerPhoneNumber, Customer customer);

    void deleteCustomer(Long id);
}
