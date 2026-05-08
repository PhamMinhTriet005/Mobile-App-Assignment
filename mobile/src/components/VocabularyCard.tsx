import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { colors, spacing, typography, radius, shadow } from '../theme';
import { Vocabulary } from '../services/api';
import { Card } from './Card';

interface VocabularyCardProps {
  vocabulary: Vocabulary;
  index: number;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({ vocabulary, index }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.index}>{index + 1}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{vocabulary.type}</Text>
        </View>
      </View>
      <Text style={styles.word}>{vocabulary.word}</Text>
      <Text style={styles.meaning}>{vocabulary.meaning}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.lift,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  index: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textTertiary,
    marginRight: spacing.sm,
    minWidth: 24,
  },
  badge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
  },
  badgeText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  word: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  meaning: {
    ...typography.body,
    color: colors.textSecondary,
  },
});