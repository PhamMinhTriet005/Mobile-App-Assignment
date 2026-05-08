package com.mobiledev.SEdu.subscription.dto;

import com.mobiledev.SEdu.subscription.model.PaymentMethod;
import com.mobiledev.SEdu.subscription.model.SubscriptionPlan;
import jakarta.validation.constraints.NotNull;

public class SubscriptionPurchaseRequest {
    @NotNull private SubscriptionPlan plan;
    @NotNull private PaymentMethod paymentMethod;

    public SubscriptionPlan getPlan() { return plan; }
    public void setPlan(SubscriptionPlan plan) { this.plan = plan; }
    public PaymentMethod getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(PaymentMethod paymentMethod) { this.paymentMethod = paymentMethod; }
}
