package com.mobiledev.SEdu.auth.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.mobiledev.SEdu.auth.dto.AuthResponse;
import com.mobiledev.SEdu.auth.dto.GoogleLoginRequest;
import com.mobiledev.SEdu.auth.dto.LoginRequest;
import com.mobiledev.SEdu.auth.dto.RegisterRequest;
import com.mobiledev.SEdu.auth.model.AuthProvider;
import com.mobiledev.SEdu.auth.model.Role;
import com.mobiledev.SEdu.auth.model.User;
import com.mobiledev.SEdu.auth.repository.UserRepository;
import com.mobiledev.SEdu.shared.security.JwtService;
import com.mobiledev.SEdu.shared.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    @Value("${app.google.clientId:YOUR_GOOGLE_CLIENT_ID}")
    private String googleClientId;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository,
                       PasswordEncoder encoder, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    public AuthResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtService.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return new AuthResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(),
                userDetails.getAuthorities().iterator().next().getAuthority());
    }

    public User registerUser(RegisterRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }
        User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()), Role.USER, AuthProvider.LOCAL);
        return userRepository.save(user);
    }

    public AuthResponse authenticateGoogleUser(GoogleLoginRequest googleLoginRequest) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId)).build();
            GoogleIdToken idToken = verifier.verify(googleLoginRequest.getIdToken());
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                String name = (String) payload.get("name");
                Optional<User> userOptional = userRepository.findByEmail(email);
                User user;
                if (userOptional.isPresent()) {
                    user = userOptional.get();
                    if (!user.getProvider().equals(AuthProvider.GOOGLE)) {
                        throw new RuntimeException("Looks like you're signed up with " + user.getProvider() + " account.");
                    }
                } else {
                    user = new User(name.replaceAll(" ", "_") + "_" + UUID.randomUUID().toString().substring(0, 5),
                            email, null, Role.USER, AuthProvider.GOOGLE);
                    user = userRepository.save(user);
                }
                String jwt = jwtService.generateTokenFromUsername(user.getUsername());
                return new AuthResponse(jwt, user.getId(), user.getUsername(), user.getEmail(), "ROLE_USER");
            } else {
                throw new RuntimeException("Invalid Google ID token.");
            }
        } catch (Exception e) {
            throw new RuntimeException("Google authentication failed: " + e.getMessage());
        }
    }

    public AuthResponse authenticateGuest() {
        String guestUsername = "guest_" + UUID.randomUUID().toString().substring(0, 8);
        User guestUser = new User(guestUsername, guestUsername + "@guest.local", null, Role.GUEST, AuthProvider.GUEST);
        guestUser = userRepository.save(guestUser);
        String jwt = jwtService.generateTokenFromUsername(guestUser.getUsername());
        return new AuthResponse(jwt, guestUser.getId(), guestUser.getUsername(), guestUser.getEmail(), "ROLE_GUEST");
    }

    @Transactional
    public void logout(Authentication authentication) {
        Authentication auth = authentication != null ? authentication : SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            String username = auth.getName();
            userRepository.findByUsername(username).ifPresent(user -> {
                if (user.getRole() == Role.GUEST || user.getProvider() == AuthProvider.GUEST) {
                    userRepository.deleteByUsername(username);
                }
            });
        }
        SecurityContextHolder.clearContext();
    }
}
