package com.mobiledev.SEdu.subscription.controller;

import com.mobiledev.SEdu.shared.dto.ApiResponse;
import com.mobiledev.SEdu.shared.security.UserDetailsImpl;
import com.mobiledev.SEdu.subscription.dto.PaymentResponse;
import com.mobiledev.SEdu.subscription.dto.SubscriptionPlanResponse;
import com.mobiledev.SEdu.subscription.dto.SubscriptionPurchaseRequest;
import com.mobiledev.SEdu.subscription.model.Subscription;
import com.mobiledev.SEdu.subscription.service.SubscriptionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/subscriptions")
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) { this.subscriptionService = subscriptionService; }

    @GetMapping("/plans")
    public ResponseEntity<ApiResponse<List<SubscriptionPlanResponse>>> getAvailablePlans() {
        List<SubscriptionPlanResponse> plans = subscriptionService.getAvailablePlans().stream()
                .map(plan -> new SubscriptionPlanResponse(plan.name(), plan.getDisplayName(), plan.getPriceVND(), plan.getBenefits()))
                .toList();
        return ResponseEntity.ok(new ApiResponse<>(true, "Available subscription plans", plans));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Subscription>> getMySubscription(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        Optional<Subscription> sub = subscriptionService.getActiveSubscription(userDetails.getId());
        if (sub.isPresent()) return ResponseEntity.ok(new ApiResponse<>(true, "Active subscription found", sub.get()));
        return ResponseEntity.ok(new ApiResponse<>(true, "No active subscription. User is on the Free plan.", null));
    }

    @PostMapping("/purchase")
    public ResponseEntity<ApiResponse<PaymentResponse>> purchaseSubscription(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody SubscriptionPurchaseRequest request) {
        PaymentResponse response = subscriptionService.purchaseSubscription(userDetails.getId(), request.getPlan(), request.getPaymentMethod());
        return ResponseEntity.ok(new ApiResponse<>(true, "Payment initiated successfully", response));
    }

    @PostMapping("/cancel")
    public ResponseEntity<ApiResponse<Void>> cancelSubscription(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        subscriptionService.cancelSubscription(userDetails.getId());
        return ResponseEntity.ok(new ApiResponse<>(true, "Subscription cancelled successfully", null));
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<Subscription>>> getSubscriptionHistory(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Subscription history", subscriptionService.getSubscriptionHistory(userDetails.getId())));
    }
}
