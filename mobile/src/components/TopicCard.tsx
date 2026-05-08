import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, touchable, radius, shadow } from '../theme';
import { Topic } from '../services/api';

interface TopicCardProps {
  topic: Topic;
  onPress: () => void;
  index: number;
  wordCount?: number;
}

const topicIcons: string[] = ['👨‍👩‍👧', '🐾', '🏞️', '🍎', '🎨', '🎵', '🏠', '🚗'];

export const TopicCard: React.FC<TopicCardProps> = ({ topic, onPress, index, wordCount }) => {
  const icon = topicIcons[index % topicIcons.length];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={topic.name}
    >
      <Text style={styles.icon}>{icon}</Text>
      <View style={styles.content}>
        <Text style={styles.name}>{topic.name}</Text>
        <Text style={styles.subtitle}>
          {typeof wordCount === 'number' ? `${wordCount} words to learn` : 'Tap to view vocabulary'}
        </Text>
      </View>
      <View style={styles.startButton}>
        <Text style={styles.startText}>Start</Text>
        <Text style={styles.startIcon}>→</Text>
      </View>
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
  },
  icon: {
    fontSize: 30,
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
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  startText: {
    ...typography.button,
    fontSize: 14,
    lineHeight: 18,
    color: colors.surface,
  },
  startIcon: {
    fontSize: 14,
    color: colors.surface,
  },
});