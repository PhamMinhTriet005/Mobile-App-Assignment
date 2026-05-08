package com.mobiledev.SEdu.subscription.dto;

import com.mobiledev.SEdu.subscription.model.PaymentMethod;

public class PaymentResponse {
    private String transactionId;
    private PaymentMethod paymentMethod;
    private Double amount;
    private String status;
    private String redirectUrl;
    private String qrCodeUrl;

    public PaymentResponse(String transactionId, PaymentMethod paymentMethod, Double amount, String status) {
        this.transactionId = transactionId; this.paymentMethod = paymentMethod;
        this.amount = amount; this.status = status;
    }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String v) { this.transactionId = v; }
    public PaymentMethod getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(PaymentMethod v) { this.paymentMethod = v; }
    public Double getAmount() { return amount; }
    public void setAmount(Double v) { this.amount = v; }
    public String getStatus() { return status; }
    public void setStatus(String v) { this.status = v; }
    public String getRedirectUrl() { return redirectUrl; }
    public void setRedirectUrl(String v) { this.redirectUrl = v; }
    public String getQrCodeUrl() { return qrCodeUrl; }
    public void setQrCodeUrl(String v) { this.qrCodeUrl = v; }
}
