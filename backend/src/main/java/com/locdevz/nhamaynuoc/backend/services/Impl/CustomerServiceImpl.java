package com.locdevz.nhamaynuoc.backend.services.Impl;

import com.locdevz.nhamaynuoc.backend.dto.CustomerDTO;
import com.locdevz.nhamaynuoc.backend.mapper.CustomerMapper;
import com.locdevz.nhamaynuoc.backend.models.Customer;
import com.locdevz.nhamaynuoc.backend.repository.CustomerRepository;
import com.locdevz.nhamaynuoc.backend.repository.WaterMeterRepository;
import com.locdevz.nhamaynuoc.backend.services.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    @Override
    public List<CustomerDTO> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll(Sort.by(Sort.Direction.DESC,"id"));

        return customers.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private CustomerDTO convertToDto(Customer customer) {
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

    @Override
    public Optional<CustomerDTO> getCustomerById(Long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        return Optional.of(CustomerMapper.convertToDto(customer.get()));
    }

    @Override
    public Boolean getIsActiveAccountByCustomerId(String customerId) {
        Customer customer = customerRepository.findByCustomerId(customerId);
        if (customer != null) {
            return customer.getIsActiveAccount();
        }
        return null;
    }

    @Override
    public Boolean getIsActiveAccountByPhoneNumber(String customerPhoneNumber) {
        Customer customer = customerRepository.findByCustomerPhoneNumber(customerPhoneNumber);
        if (customer != null) {
            return customer.getIsActiveAccount();
        }
        return null;
    }

    @Override
    public Customer getCustomerByPhoneNumber(String customerPhoneNumber) {
        return customerRepository.findByCustomerPhoneNumber(customerPhoneNumber);
    }

    @Override
    public Customer createOrUpdateCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Boolean checkExistsCustomer(String customerId) {
        return customerRepository.existsByCustomerId(customerId);
    }

    @Override
    public Boolean checkExistsCustomerByPhoneNumber(String customerPhoneNumber) {
        return customerRepository.existsByCustomerPhoneNumber(customerPhoneNumber);
//        return null;
    }

//    @Override
//    public Customer updateActiveAccount(String customerPhoneNumber, Customer customer) {
//        return null;
//    }

    @Override
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}
