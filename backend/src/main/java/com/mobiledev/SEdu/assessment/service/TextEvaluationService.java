package com.mobiledev.SEdu.assessment.service;

import org.springframework.stereotype.Service;

@Service
public class TextEvaluationService {

    public double evaluateSimilarity(String recognized, String reference) {
        if (recognized == null || reference == null) return 0.0;
        String cleanRecognized = recognized.replaceAll("[^a-zA-Z0-9\\s]", "").toLowerCase().trim();
        String cleanReference = reference.replaceAll("[^a-zA-Z0-9\\s]", "").toLowerCase().trim();
        if (cleanRecognized.equals(cleanReference)) return 100.0;
        if (cleanRecognized.isEmpty() || cleanReference.isEmpty()) return 0.0;
        int distance = calculateLevenshteinDistance(cleanRecognized, cleanReference);
        int maxLength = Math.max(cleanRecognized.length(), cleanReference.length());
        return Math.max(0.0, (1.0 - ((double) distance / maxLength)) * 100.0);
    }

    private int calculateLevenshteinDistance(String a, String b) {
        int[][] dp = new int[a.length() + 1][b.length() + 1];
        for (int i = 0; i <= a.length(); i++) {
            for (int j = 0; j <= b.length(); j++) {
                if (i == 0) dp[i][j] = j;
                else if (j == 0) dp[i][j] = i;
                else {
                    int cost = (a.charAt(i - 1) == b.charAt(j - 1)) ? 0 : 1;
                    dp[i][j] = Math.min(Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1), dp[i - 1][j - 1] + cost);
                }
            }
        }
        return dp[a.length()][b.length()];
    }
}
