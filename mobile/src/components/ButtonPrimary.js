import { Pressable, StyleSheet } from 'react-native';
import AppText from './AppText';
import theme from '../theme';

export default function ButtonPrimary({ title, onPress, style, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style
      ]}
    >
      <AppText style={styles.text}>{title}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primaryContainer,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    minHeight: theme.spacing.touchTargetMin,
    justifyContent: 'center'
  },
  pressed: {
    opacity: 0.9,
    transform: [{ translateY: 1 }]
  },
  disabled: {
    backgroundColor: theme.colors.surfaceContainerHigh,
    opacity: 0.7
  },
  text: {
    color: theme.colors.onPrimary,
    ...theme.typography.button
  }
});
