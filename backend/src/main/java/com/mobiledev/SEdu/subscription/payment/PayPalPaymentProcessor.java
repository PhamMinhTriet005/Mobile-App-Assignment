package com.mobiledev.SEdu.subscription.payment;

import com.mobiledev.SEdu.subscription.dto.PaymentResponse;
import com.mobiledev.SEdu.subscription.model.PaymentMethod;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service("paypalPaymentProcessor")
public class PayPalPaymentProcessor implements PaymentProcessor {
    @Override
    public PaymentResponse processPayment(double amount, String description, String userId) {
        String transactionId = "PP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String redirectUrl = "https://www.sandbox.paypal.com/checkoutnow?token=" + transactionId;
        PaymentResponse response = new PaymentResponse(transactionId, PaymentMethod.PAYPAL, amount, "PENDING");
        response.setRedirectUrl(redirectUrl);
        return response;
    }
    @Override public PaymentMethod getPaymentMethod() { return PaymentMethod.PAYPAL; }
}
