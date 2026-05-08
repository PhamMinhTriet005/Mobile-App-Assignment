package com.mobiledev.SEdu.subscription.dto;

import java.util.List;

public class SubscriptionPlanResponse {
    private String name;
    private String displayName;
    private double priceVND;
    private List<String> benefits;

    public SubscriptionPlanResponse(String name, String displayName, double priceVND, List<String> benefits) {
        this.name = name; this.displayName = displayName; this.priceVND = priceVND; this.benefits = benefits;
    }

    public String getName() { return name; }
    public void setName(String v) { this.name = v; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String v) { this.displayName = v; }
    public double getPriceVND() { return priceVND; }
    public void setPriceVND(double v) { this.priceVND = v; }
    public List<String> getBenefits() { return benefits; }
    public void setBenefits(List<String> v) { this.benefits = v; }
}
