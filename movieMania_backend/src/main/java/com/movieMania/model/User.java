package com.movieMania.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity // Marks the class as a JPA entity
@Table(name = "users") // Maps the class to the "users" table in the database
@Data
@AllArgsConstructor
public class User {
    @Id // Marks the field as the primary key of the entity.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String role;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime createdAt;
}