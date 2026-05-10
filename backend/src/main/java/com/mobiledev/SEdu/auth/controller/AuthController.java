package com.mobiledev.SEdu.auth.controller;

import com.mobiledev.SEdu.auth.dto.AuthResponse;
import com.mobiledev.SEdu.auth.dto.GoogleLoginRequest;
import com.mobiledev.SEdu.auth.dto.LoginRequest;
import com.mobiledev.SEdu.auth.dto.RegisterRequest;
import com.mobiledev.SEdu.auth.model.User;
import com.mobiledev.SEdu.auth.service.AuthService;
import com.mobiledev.SEdu.shared.dto.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponse response = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(new ApiResponse<>(true, "User logged in successfully", response));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
        User registeredUser = authService.registerUser(signUpRequest);
        return ResponseEntity.ok(new ApiResponse<>(true, "User registered successfully", registeredUser));
    }

    @PostMapping("/google")
    public ResponseEntity<ApiResponse<AuthResponse>> authenticateGoogleUser(@Valid @RequestBody GoogleLoginRequest googleLoginRequest) {
        AuthResponse response = authService.authenticateGoogleUser(googleLoginRequest);
        return ResponseEntity.ok(new ApiResponse<>(true, "Google user logged in successfully", response));
    }

    @PostMapping("/guest")
    public ResponseEntity<ApiResponse<AuthResponse>> authenticateGuest() {
        AuthResponse response = authService.authenticateGuest();
        return ResponseEntity.ok(new ApiResponse<>(true, "Guest user logged in successfully", response));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(Authentication authentication) {
        authService.logout(authentication);
        return ResponseEntity.ok(new ApiResponse<>(true, "User logged out successfully", null));
    }
}
