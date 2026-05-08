package com.mobiledev.SEdu.subscription.payment;

import com.mobiledev.SEdu.subscription.model.PaymentMethod;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class PaymentProcessorFactory {
    private final Map<PaymentMethod, PaymentProcessor> processors;

    public PaymentProcessorFactory(List<PaymentProcessor> processorList) {
        this.processors = processorList.stream()
                .collect(Collectors.toMap(PaymentProcessor::getPaymentMethod, p -> p));
    }

    public PaymentProcessor getProcessor(PaymentMethod method) {
        PaymentProcessor processor = processors.get(method);
        if (processor == null) throw new IllegalArgumentException("Unsupported payment method: " + method);
        return processor;
    }
}
