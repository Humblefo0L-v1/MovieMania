package com.movieMania.security;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.*;

/**
 * Utility class for generating and validating JSON Web Tokens (JWTs)
 * for user authentication and authorization.
 */

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey; // Secret key used for signing the JWTs, injected from application.properties

    @Value("${jwt.expiration}")
    private long jwtExpirationInMs; // JWT expiration time in milliseconds, injected from application.properties

    // Generates a JWT token for the given username, role, and userId
    public String generateToken(String username, String role, Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        claims.put("userId", userId);
        claims.put("username", username);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
                .compact();
    }

    // Extracts the userId from the given JWT token
    public Long extractUserId(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("userId", Long.class);
    }

    // Extracts the username from the given JWT token
    public String extractUsername(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("username", String.class);
    }

    // Extracts the user role from the given JWT token
    public String extractUserRole(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("role", String.class);
    }

    // Extracts the expiration date from the given JWT token
    public Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    // Extracts all claims from the given JWT token using the secret key for
    // validation
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Checks if the given JWT token is expired by comparing the expiration date
    // with the current date
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Validates the given JWT token by checking if the username matches and if the
    // token is not expired
    public Boolean validateToken(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    // Returns the signing key used for validating the JWT token, generated from the
    // secret key
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }
}