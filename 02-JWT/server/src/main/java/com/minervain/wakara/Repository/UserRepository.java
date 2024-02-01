package com.minervain.wakara.Repository;

import com.minervain.wakara.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByUsername(String username);

    Optional<Users> findByUsernameAndPassword(String username, String password);
}
