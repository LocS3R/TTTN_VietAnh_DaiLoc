package com.locdevz.nhamaynuoc.backend.repository;

import com.locdevz.nhamaynuoc.backend.models.Account;
import com.locdevz.nhamaynuoc.backend.models.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);

    @Modifying
    void deleteByAccount(Account account);
}
