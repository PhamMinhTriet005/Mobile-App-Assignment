package com.mobiledev.SEdu.subscription.payment;

import com.mobiledev.SEdu.subscription.dto.PaymentResponse;
import com.mobiledev.SEdu.subscription.model.PaymentMethod;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service("debitCardPaymentProcessor")
public class DebitCardPaymentProcessor implements PaymentProcessor {
    @Override
    public PaymentResponse processPayment(double amount, String description, String userId) {
        String transactionId = "DC-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return new PaymentResponse(transactionId, PaymentMethod.DEBIT_CARD, amount, "SUCCESS");
    }
    @Override public PaymentMethod getPaymentMethod() { return PaymentMethod.DEBIT_CARD; }
}
