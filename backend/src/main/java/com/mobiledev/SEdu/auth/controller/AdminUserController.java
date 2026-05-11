package com.mobiledev.SEdu.auth.controller;

import com.mobiledev.SEdu.auth.dto.AdminUserSummary;
import com.mobiledev.SEdu.auth.model.User;
import com.mobiledev.SEdu.auth.repository.UserRepository;
import com.mobiledev.SEdu.shared.dto.ApiResponse;
import com.mobiledev.SEdu.subscription.repository.SubscriptionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private final UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepository;

    public AdminUserController(UserRepository userRepository, SubscriptionRepository subscriptionRepository) {
        this.userRepository = userRepository;
        this.subscriptionRepository = subscriptionRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AdminUserSummary>>> getAllUsers() {
        List<AdminUserSummary> users = userRepository.findAll().stream()
                .map(this::toSummary)
                .toList();
        return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", users));
    }

    private AdminUserSummary toSummary(User user) {
        var activeSubscription = subscriptionRepository.findByUserIdAndActiveTrue(user.getId());
        String plan = activeSubscription
                .map(subscription -> subscription.getPlan().getDisplayName())
                .orElse("Free");

        String joinedAt = user.getCreatedAt() == null
                ? "-"
                : DATE_FORMATTER.format(user.getCreatedAt().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());

        String updatedAt = user.getUpdatedAt() == null
                ? "-"
                : DATE_FORMATTER.format(user.getUpdatedAt().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());

        return new AdminUserSummary(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole() == null ? "USER" : user.getRole().name(),
                user.getProvider() == null ? "LOCAL" : user.getProvider().name(),
                plan,
                activeSubscription.isPresent(),
                joinedAt,
                updatedAt
        );
    }
}
