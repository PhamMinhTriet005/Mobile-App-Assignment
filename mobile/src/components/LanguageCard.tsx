import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, touchable, radius, shadow } from '../theme';
import { Language } from '../services/api';

interface LanguageCardProps {
  language: Language;
  onPress: () => void;
}

const languageFlags: Record<string, string> = {
  en: '🇬🇧',
  cn: '🇨🇳',
  jp: '🇯🇵',
  kr: '🇰🇷',
  fr: '🇫🇷',
  de: '🇩🇪',
  es: '🇪🇸',
  vi: '🇻🇳',
};

export const LanguageCard: React.FC<LanguageCardProps> = ({ language, onPress }) => {
  const flag = languageFlags[language.code] || '🌐';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Learn ${language.name}`}
    >
      <Text style={styles.flag}>{flag}</Text>
      <View style={styles.content}>
        <Text style={styles.name}>{language.name}</Text>
        <Text style={styles.subtitle}>Tap to start learning</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.xl,
    padding: spacing.lg,
    minHeight: 72,
    marginBottom: spacing.md,
    ...shadow.lift,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  flag: {
    fontSize: 36,
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  name: {
    ...typography.headline,
    color: colors.text,
  },
  subtitle: {
    ...typography.callout,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  chevron: {
    fontSize: 26,
    color: colors.textTertiary,
    fontWeight: '300',
  },
});