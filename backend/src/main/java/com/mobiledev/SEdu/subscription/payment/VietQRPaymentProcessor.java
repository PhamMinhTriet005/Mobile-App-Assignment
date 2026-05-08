package com.mobiledev.SEdu.subscription.payment;

import com.mobiledev.SEdu.subscription.dto.PaymentResponse;
import com.mobiledev.SEdu.subscription.model.PaymentMethod;
import org.springframework.stereotype.Service;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Service("vietqrPaymentProcessor")
public class VietQRPaymentProcessor implements PaymentProcessor {
    private static final String VIETQR_BASE_URL = "https://img.vietqr.io/image";
    private static final String BANK_ID = "MB";
    private static final String ACCOUNT_NO = "0123456789";
    private static final String ACCOUNT_NAME = "SEDU EDUCATION";
    private static final String TEMPLATE = "compact2";

    @Override
    public PaymentResponse processPayment(double amount, String description, String userId) {
        String transactionId = "VQR-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String encodedDesc = URLEncoder.encode(description + " " + transactionId, StandardCharsets.UTF_8);
        String encodedName = URLEncoder.encode(ACCOUNT_NAME, StandardCharsets.UTF_8);
        String qrCodeUrl = String.format("%s/%s-%s-%s.png?amount=%.0f&addInfo=%s&accountName=%s",
                VIETQR_BASE_URL, BANK_ID, ACCOUNT_NO, TEMPLATE, amount, encodedDesc, encodedName);
        PaymentResponse response = new PaymentResponse(transactionId, PaymentMethod.VIETQR, amount, "PENDING");
        response.setQrCodeUrl(qrCodeUrl);
        return response;
    }

    @Override public PaymentMethod getPaymentMethod() { return PaymentMethod.VIETQR; }
}
