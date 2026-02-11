package com.movieMania.service;

import org.springframework.stereotype.Service;

import com.movieMania.dto.RegisterRequest;
import com.movieMania.repository.UserRepository;
import jakarta.transaction.Transactional;
import com.movieMania.dto.AuthResponse;
import com.movieMania.dto.LoginRequest;
import com.movieMania.model.User;
import com.movieMania.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.RequiredArgsConstructor;

/**
 * UserService class that handles user-related operations such as registration
 * and authentication
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    /**
     * Register a new user
     * 
     * @param request Registration data (username, email, password)
     * @return AuthResponse with JWT token and user details
     * @throws RuntimeException if username or email already exists
     */
    @Transactional
    public AuthResponse registerUser(RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Username already exists, please choose another one");
        }
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already exists, please login or use another email");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());

        String hashedPassword = passwordEncoder.encode(registerRequest.getPassword());
        user.setPassword(hashedPassword);

        user.setEmail(registerRequest.getEmail());
        user.setRole("USER");

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole(), user.getUserId());

        return new AuthResponse(token, user.getUserId(), user.getUsername(), user.getRole(), user.getEmail());
    }

    public AuthResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole(), user.getUserId());
        return new AuthResponse(token, user.getUserId(), user.getUsername(), user.getRole(), user.getEmail());
    }
}
