import React from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { colors, spacing, radius, shadow } from '../theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: object;
}

export const Card: React.FC<CardProps> = ({ children, onPress, style }) => {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          style,
          pressed && styles.pressed,
        ]}
        accessible={true}
        accessibilityRole="button"
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    ...Platform.select({
      ios: shadow.card,
      android: shadow.card,
    }),
  },
  pressed: {
    opacity: 0.9,
  },
});