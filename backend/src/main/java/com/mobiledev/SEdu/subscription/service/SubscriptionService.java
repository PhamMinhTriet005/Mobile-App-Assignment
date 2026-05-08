package com.mobiledev.SEdu.subscription.service;

import com.mobiledev.SEdu.subscription.dto.PaymentResponse;
import com.mobiledev.SEdu.subscription.model.PaymentMethod;
import com.mobiledev.SEdu.subscription.model.Subscription;
import com.mobiledev.SEdu.subscription.model.SubscriptionPlan;
import com.mobiledev.SEdu.subscription.payment.PaymentProcessor;
import com.mobiledev.SEdu.subscription.payment.PaymentProcessorFactory;
import com.mobiledev.SEdu.subscription.repository.SubscriptionRepository;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    private final PaymentProcessorFactory paymentProcessorFactory;

    public SubscriptionService(SubscriptionRepository subscriptionRepository, PaymentProcessorFactory paymentProcessorFactory) {
        this.subscriptionRepository = subscriptionRepository;
        this.paymentProcessorFactory = paymentProcessorFactory;
    }

    public List<SubscriptionPlan> getAvailablePlans() { return List.of(SubscriptionPlan.values()); }

    public Optional<Subscription> getActiveSubscription(String userId) {
        return subscriptionRepository.findByUserIdAndActiveTrue(userId);
    }

    public PaymentResponse purchaseSubscription(String userId, SubscriptionPlan plan, PaymentMethod paymentMethod) {
        if (plan == SubscriptionPlan.FREE) throw new RuntimeException("The Free plan does not require a payment.");
        Optional<Subscription> existing = subscriptionRepository.findByUserIdAndActiveTrue(userId);
        if (existing.isPresent()) throw new RuntimeException("User already has an active subscription: " + existing.get().getPlan().getDisplayName());

        PaymentProcessor processor = paymentProcessorFactory.getProcessor(paymentMethod);
        String description = "S-Edu " + plan.getDisplayName() + " Subscription";
        PaymentResponse paymentResponse = processor.processPayment(plan.getPriceVND(), description, userId);

        Instant now = Instant.now();
        Instant endDate = (plan == SubscriptionPlan.PREMIUM_YEARLY) ? now.plus(365, ChronoUnit.DAYS) : now.plus(30, ChronoUnit.DAYS);
        Subscription subscription = new Subscription(userId, plan, paymentMethod, paymentResponse.getTransactionId(), plan.getPriceVND(), now, endDate);
        subscriptionRepository.save(subscription);
        return paymentResponse;
    }

    public void cancelSubscription(String userId) {
        Subscription subscription = subscriptionRepository.findByUserIdAndActiveTrue(userId)
                .orElseThrow(() -> new RuntimeException("No active subscription found for this user."));
        subscription.setActive(false);
        subscriptionRepository.save(subscription);
    }

    public List<Subscription> getSubscriptionHistory(String userId) { return subscriptionRepository.findByUserId(userId); }
}
