package com.movieMania.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;

/**
 * LoginRequest Data Transfer Object (DTO) that encapsulates the data sent by
 * the client during user login.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email; // The email address of the user attempting to log in, which must be in a valid
                          // email format.

    @NotBlank(message = "Password is required")
    private String password; // The password of the user attempting to log in, which must not be blank.
}
