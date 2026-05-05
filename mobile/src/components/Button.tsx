import React from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, spacing, typography, touchable } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  size?: 'large' | 'medium';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  size = 'large',
}) => {
  const getButtonStyle = () => {
    const base = [styles.button, styles[`${size}Button`]];
    if (variant === 'primary') base.push(styles.primaryButton);
    if (variant === 'secondary') base.push(styles.secondaryButton);
    if (variant === 'outline') base.push(styles.outlineButton);
    if (disabled) base.push(styles.disabled);
    return base;
  };

  const getTextStyle = () => {
    const base = [styles.buttonText, styles[`${size}Text`]];
    if (variant === 'primary') base.push(styles.primaryText);
    if (variant === 'secondary') base.push(styles.secondaryText);
    if (variant === 'outline') base.push(styles.outlineText);
    if (disabled) base.push(styles.disabledText);
    return base;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        getButtonStyle(),
        pressed && !disabled && styles.pressed,
      ]}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : colors.primary} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: touchable.minHeight,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeButton: {
    minHeight: 56,
    paddingVertical: spacing.lg,
  },
  mediumButton: {
    minHeight: 44,
    paddingVertical: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  largeText: {
    fontSize: 18,
    lineHeight: 24,
  },
  mediumText: {
    fontSize: 16,
    lineHeight: 20,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: colors.primary,
  },
  disabledText: {
    color: colors.textTertiary,
  },
});