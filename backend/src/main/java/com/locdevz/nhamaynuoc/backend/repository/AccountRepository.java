package com.locdevz.nhamaynuoc.backend.repository;

import com.locdevz.nhamaynuoc.backend.models.Account;
import com.locdevz.nhamaynuoc.backend.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByUsername(String username);

    Boolean existsByUsername(String username);
}
