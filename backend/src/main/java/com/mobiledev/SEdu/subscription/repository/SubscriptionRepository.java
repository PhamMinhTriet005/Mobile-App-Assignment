package com.mobiledev.SEdu.subscription.repository;

import com.mobiledev.SEdu.subscription.model.Subscription;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends MongoRepository<Subscription, String> {
    List<Subscription> findByUserId(String userId);
    Optional<Subscription> findByUserIdAndActiveTrue(String userId);
}
