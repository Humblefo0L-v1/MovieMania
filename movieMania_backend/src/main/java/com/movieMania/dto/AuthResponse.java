package com.movieMania.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * AuthResponse Data Transfer Object (DTO) that encapsulates the response sent
 * back to the client after a successful authentication or registration.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token; // JWT token generated for the authenticated user
    private Long userId; // Unique identifier of the authenticated user
    private String username; // Username of the authenticated user
    private String role; // Role of the authenticated user (e.g., USER, ADMIN)
    private String email; // Email of the authenticated user
}
