import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, touchable } from '../theme';
import { Topic } from '../services/api';

interface TopicCardProps {
  topic: Topic;
  onPress: () => void;
  index: number;
}

const topicIcons: string[] = ['👨‍👩‍👧', '🐾', '🏞️', '🍎', '🎨', '🎵', '🏠', '🚗'];

export const TopicCard: React.FC<TopicCardProps> = ({ topic, onPress, index }) => {
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
        <Text style={styles.subtitle}>Tap to view vocabulary</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    minHeight: touchable.minHeight + 12,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  icon: {
    fontSize: 32,
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
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  chevron: {
    fontSize: 28,
    color: colors.textTertiary,
    fontWeight: '300',
  },
});