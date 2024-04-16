package com.locdevz.nhamaynuoc.backend.repository;

import com.locdevz.nhamaynuoc.backend.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Boolean existsByCustomerId(String customerId);
    Boolean existsByCustomerPhoneNumber(String customerPhoneNumber);
    Customer findByCustomerId(String customerId);

    Customer findByCustomerPhoneNumber(String customerPhoneNumber);
}
