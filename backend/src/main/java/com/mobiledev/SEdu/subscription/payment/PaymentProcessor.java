package com.mobiledev.SEdu.subscription.payment;

import com.mobiledev.SEdu.subscription.dto.PaymentResponse;
import com.mobiledev.SEdu.subscription.model.PaymentMethod;

public interface PaymentProcessor {
    PaymentResponse processPayment(double amount, String description, String userId);
    PaymentMethod getPaymentMethod();
}
