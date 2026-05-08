package com.mobiledev.SEdu.subscription.model;

import java.util.Arrays;
import java.util.List;

public enum SubscriptionPlan {

    FREE("Free", 0.0, Arrays.asList(
            "Access to basic vocabulary lessons",
            "Limited to 3 topics per language",
            "5 pronunciation tests per day",
            "Ad-supported experience"
    )),

    PREMIUM_MONTHLY("Premium Monthly", 49000.0, Arrays.asList(
            "Unlimited access to ALL topics & languages",
            "Unlimited pronunciation assessments",
            "Advanced AI-powered pronunciation feedback",
            "Offline lesson downloads",
            "Ad-free experience",
            "Priority customer support",
            "Progress tracking & detailed analytics"
    )),

    PREMIUM_YEARLY("Premium Yearly", 399000.0, Arrays.asList(
            "Everything in Premium Monthly",
            "Save 32% compared to monthly billing",
            "Exclusive yearly subscriber badge",
            "Early access to new features & content"
    ));

    private final String displayName;
    private final double priceVND;
    private final List<String> benefits;

    SubscriptionPlan(String displayName, double priceVND, List<String> benefits) {
        this.displayName = displayName; this.priceVND = priceVND; this.benefits = benefits;
    }

    public String getDisplayName() { return displayName; }
    public double getPriceVND() { return priceVND; }
    public List<String> getBenefits() { return benefits; }
}
