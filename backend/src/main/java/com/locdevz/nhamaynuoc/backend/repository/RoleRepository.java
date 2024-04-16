package com.locdevz.nhamaynuoc.backend.repository;

import com.locdevz.nhamaynuoc.backend.models.ERole;
import com.locdevz.nhamaynuoc.backend.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
