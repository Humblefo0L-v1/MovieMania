package com.movieMania.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import com.movieMania.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // Custom query method to find a user by their username
    Optional<User> findByUsername(String username);

    // Custom query method to find a user by their email
    Optional<User> findByEmail(String email);

    // Custom query method to check if a user exists by their username
    Boolean existsByUsername(String username);

    // Custom query method to check if a user exists by their email
    Boolean existsByEmail(String email);
}
