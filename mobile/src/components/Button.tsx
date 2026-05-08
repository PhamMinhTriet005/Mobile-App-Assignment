import React from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, spacing, typography, touchable, radius, shadow } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  size?: 'large' | 'medium';
  icon?: string;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  size = 'large',
  icon,
  iconPosition = 'right',
}) => {
  const getButtonStyle = () => {
    const base = [styles.button, styles[`${size}Button`]];
    if (variant === 'primary') base.push(styles.primaryButton);
    if (variant === 'secondary') base.push(styles.secondaryButton);
    if (variant === 'outline') base.push(styles.outlineButton);
    if (variant === 'ghost') base.push(styles.ghostButton);
    if (disabled) base.push(styles.disabled);
    if (variant === 'primary' && !disabled) base.push(styles.primaryShadow);
    return base;
  };

  const getTextStyle = () => {
    const base = [styles.buttonText, styles[`${size}Text`]];
    if (variant === 'primary') base.push(styles.primaryText);
    if (variant === 'secondary') base.push(styles.secondaryText);
    if (variant === 'outline') base.push(styles.outlineText);
    if (variant === 'ghost') base.push(styles.ghostText);
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
        <View style={styles.content}>
          {icon && iconPosition === 'left' ? (
            <Text style={[styles.icon, getTextStyle()]}>{icon}</Text>
          ) : null}
          <Text style={getTextStyle()}>{title}</Text>
          {icon && iconPosition === 'right' ? (
            <Text style={[styles.icon, getTextStyle()]}>{icon}</Text>
          ) : null}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: touchable.minHeight,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeButton: {
    minHeight: 56,
    paddingVertical: spacing.lg,
  },
  mediumButton: {
    minHeight: touchable.minHeight,
    paddingVertical: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  primaryShadow: {
    ...shadow.lift,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: colors.primary,
  },
  ghostButton: {
    backgroundColor: colors.surfaceLow,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    ...typography.button,
    textAlign: 'center',
  },
  largeText: {
    fontSize: 20,
    lineHeight: 24,
  },
  mediumText: {
    fontSize: 18,
    lineHeight: 24,
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
  ghostText: {
    color: colors.text,
  },
  disabledText: {
    color: colors.textTertiary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  icon: {
    fontSize: 18,
  },
});