package com.mobiledev.SEdu.auth.dto;

public record AdminUserSummary(
        String id,
        String name,
        String email,
        String role,
        String provider,
        String plan,
        boolean subscriptionActive,
        String joinedAt,
        String updatedAt
) {}
