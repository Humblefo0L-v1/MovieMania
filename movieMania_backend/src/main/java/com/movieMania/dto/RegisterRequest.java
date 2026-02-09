package com.movieMania.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * RegisterRequest Data Transfer Object (DTO) that encapsulates the data sent by
 * the client during user registration.
 * It includes validation annotations to ensure that the input data meets the
 * required criteria.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
    private String username; // The username of the user registering for an account.

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password; // The password of the user registering for an account.

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email; // The email address of the user registering for an account, which must be in a
                          // valid email format.
}
