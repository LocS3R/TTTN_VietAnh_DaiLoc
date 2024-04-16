package com.locdevz.nhamaynuoc.backend.controllers;

import com.locdevz.nhamaynuoc.backend.dto.CustomerDTO;
import com.locdevz.nhamaynuoc.backend.models.Customer;
import com.locdevz.nhamaynuoc.backend.services.Impl.CustomerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    @Autowired
    private CustomerServiceImpl customerService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public List<CustomerDTO> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE') or hasRole('USER')")
    public ResponseEntity<CustomerDTO> getCustomerById(@PathVariable Long id) {
        Optional<CustomerDTO> customer = customerService.getCustomerById(id);
        return customer.map(value -> ResponseEntity.ok().body(value))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/phone/{customerPhoneNumber}")
    public ResponseEntity<CustomerDTO> getCustomerById(@PathVariable String customerPhoneNumber) {
//        Optional<CustomerDTO> customerDTO = customerService.getCustomerByPhoneNumber(customerPhoneNumber);
        Customer customer = customerService.getCustomerByPhoneNumber(customerPhoneNumber);

        if (customer != null) {
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
            return ResponseEntity.ok().body(dto);
        }
        return null;
    }

    @GetMapping("/exists/{customerId}")
    public Boolean checkCustomerExists(@PathVariable String customerId) {
        return customerService.checkExistsCustomer(customerId);
    }

    @GetMapping("/exists/phone/{customerPhoneNumber}")
    public Boolean checkCustomerExistsByPhoneNumber(@PathVariable String customerPhoneNumber) {
        return customerService.checkExistsCustomerByPhoneNumber(customerPhoneNumber);
    }

    @GetMapping("/isActive/{customerId}")
    public Boolean checkAccountActive(@PathVariable String customerId) {
        return customerService.getIsActiveAccountByCustomerId(customerId);
    }

    @GetMapping("/isActive/phone/{customerPhoneNumber}")
    public Boolean checkAccountActiveByPhoneNumber(@PathVariable String customerPhoneNumber) {
        return customerService.getIsActiveAccountByPhoneNumber(customerPhoneNumber);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        Customer createdCustomer = customerService.createOrUpdateCustomer(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCustomer);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {
        customer.setId(id);
        Customer updatedCustomer = customerService.createOrUpdateCustomer(customer);
        return ResponseEntity.ok().body(updatedCustomer);
    }

    @PutMapping("/phone/{customerPhoneNumber}")
    public ResponseEntity<?> updateCustomerActiveAccount(@PathVariable String customerPhoneNumber) {
        Customer customer = customerService.getCustomerByPhoneNumber(customerPhoneNumber);
        customer.setIsActiveAccount(true);
        Customer updatedCustomer = customerService.createOrUpdateCustomer(customer);

        CustomerDTO dto = new CustomerDTO();
        dto.setId(updatedCustomer.getId());
        dto.setCustomerId(updatedCustomer.getCustomerId());
        dto.setCustomerName(updatedCustomer.getCustomerName());
        dto.setCustomerPhoneNumber(updatedCustomer.getCustomerPhoneNumber());
        dto.setCustomerAddress(updatedCustomer.getCustomerAddress());
        dto.setReadBook(updatedCustomer.getReadBook());
        if (updatedCustomer.getWaterMeter() != null) {
            dto.setWaterMeterId(updatedCustomer.getWaterMeter().getId());
        }
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }
}

