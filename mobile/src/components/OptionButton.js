import { Pressable, StyleSheet } from 'react-native';
import AppText from './AppText';
import theme from '../theme';

export default function OptionButton({ label, selected, onPress, correct, showResult }) {
  const stateStyle = showResult
    ? correct
      ? styles.correct
      : selected
      ? styles.incorrect
      : null
    : selected
    ? styles.selected
    : null;

  return (
    <Pressable onPress={onPress} style={[styles.base, stateStyle]}>
      <AppText style={styles.text}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surfaceContainerLow,
    marginBottom: 12
  },
  selected: {
    backgroundColor: theme.colors.primaryContainer
  },
  correct: {
    backgroundColor: theme.colors.secondaryContainer
  },
  incorrect: {
    backgroundColor: theme.colors.tertiaryContainer
  },
  text: {
    ...theme.typography.bodyMD,
    color: theme.colors.onSurface
  }
});
