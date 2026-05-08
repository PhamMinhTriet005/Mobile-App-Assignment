import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api, Topic, Language, TestResult } from '../services/api';
import { colors, spacing, typography, touchable, radius, shadow } from '../theme';
import { TopicCard } from '../components/TopicCard';

export const TopicsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const language: Language = route.params?.language;

  const [topics, setTopics] = useState<Topic[]>([]);
  const [recentTopics, setRecentTopics] = useState<Array<{ topic: Topic; progress: number }>>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [vocabCounts, setVocabCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const buildRecentTopics = (topicsData: Topic[], history: TestResult[]) => {
    const byTopic = new Map<string, { total: number; count: number; last: string }>();
    history.forEach((item) => {
      const existing = byTopic.get(item.topicId);
      const last = existing?.last && new Date(existing.last) > new Date(item.completedAt)
        ? existing.last
        : item.completedAt;
      byTopic.set(item.topicId, {
        total: (existing?.total || 0) + item.percentage,
        count: (existing?.count || 0) + 1,
        last,
      });
    });

    return Array.from(byTopic.entries())
      .map(([topicId, stats]) => {
        const topic = topicsData.find((item) => item.id === topicId);
        return topic
          ? { topic, progress: Math.round(stats.total / stats.count), last: stats.last }
          : null;
      })
      .filter((item): item is { topic: Topic; progress: number; last: string } => Boolean(item))
      .sort((a, b) => new Date(b.last).getTime() - new Date(a.last).getTime())
      .slice(0, 3)
      .map(({ topic, progress }) => ({ topic, progress }));
  };

  const loadTopics = async () => {
    try {
      const [topicsData, history, vocabData] = await Promise.all([
        api.getTopicsByLanguage(language.id),
        api.getTestHistory(),
        api.getAllVocabularies(),
      ]);
      const counts = vocabData.reduce<Record<string, number>>((acc, vocab) => {
        acc[vocab.topicId] = (acc[vocab.topicId] || 0) + 1;
        return acc;
      }, {});
      setTopics(topicsData);
      setRecentTopics(buildRecentTopics(topicsData, history));
      setVocabCounts(counts);
    } catch (error) {
      console.error('Failed to load topics:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTopics();
  }, [language.id]);

  const onRefresh = () => {
    setRefreshing(true);
    loadTopics();
  };

  const handleTopicPress = (topic: Topic) => {
    navigation.navigate('Vocabulary', { topic, language });
  };

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return topics;
    const query = searchQuery.toLowerCase();
    return topics.filter((topic) => topic.name.toLowerCase().includes(query));
  }, [topics, searchQuery]);

  const renderItem = ({ item, index }: { item: Topic; index: number }) => (
    <TopicCard
      topic={item}
      onPress={() => handleTopicPress(item)}
      index={index}
      wordCount={vocabCounts[item.id]}
    />
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading topics...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={filteredTopics}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Text style={styles.backText}>‹ Back</Text>
            </Pressable>
            <Text style={styles.languageName}>Good morning!</Text>
            <Text style={styles.subtitle}>Vocabulary Topics in {language.name}</Text>
            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                placeholder="Search topics"
                placeholderTextColor={colors.textTertiary}
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            {recentTopics.length > 0 ? (
              <View style={styles.recentSection}>
                <Text style={styles.sectionTitle}>Recently learned</Text>
                {recentTopics.map((item) => (
                  <Pressable
                    key={item.topic.id}
                    onPress={() => handleTopicPress(item.topic)}
                    style={({ pressed }) => [styles.recentCard, pressed && styles.recentPressed]}
                    accessibilityRole="button"
                    accessibilityLabel={`${item.topic.name} ${item.progress}% complete`}
                  >
                    <View style={styles.recentContent}>
                      <Text style={styles.recentTitle}>{item.topic.name}</Text>
                      <Text style={styles.recentSubtitle}>
                        {vocabCounts[item.topic.id] || 0} words to learn
                      </Text>
                      <Text style={styles.recentProgressText}>{item.progress}% complete</Text>
                      <View style={styles.recentProgressBar}>
                        <View style={[styles.recentProgressFill, { width: `${item.progress}%` }]} />
                      </View>
                    </View>
                    <View style={styles.recentCta}>
                      <Text style={styles.recentCtaText}>Start</Text>
                      <Text style={styles.recentCtaIcon}>→</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            ) : (
              <Text style={styles.sectionTitle}>Choose a subject to start learning</Text>
            )}
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  backButton: {
    minHeight: touchable.minHeight,
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  backText: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '600',
  },
  languageName: {
    ...typography.largeTitle,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: touchable.minHeight,
    marginBottom: spacing.lg,
    ...shadow.lift,
  },
  searchIcon: {
    ...typography.caption,
    color: colors.textTertiary,
    marginRight: spacing.sm,
  },
  searchInput: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  sectionTitle: {
    ...typography.headline,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  recentSection: {
    marginBottom: spacing.lg,
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.lift,
  },
  recentPressed: {
    opacity: 0.9,
  },
  recentContent: {
    flex: 1,
  },
  recentTitle: {
    ...typography.headline,
    color: colors.text,
  },
  recentSubtitle: {
    ...typography.callout,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  recentProgressText: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  recentProgressBar: {
    height: 10,
    backgroundColor: colors.surfaceHigh,
    borderRadius: radius.full,
    marginTop: spacing.sm,
    overflow: 'hidden',
  },
  recentProgressFill: {
    height: '100%',
    backgroundColor: colors.secondary,
    borderRadius: radius.full,
  },
  recentCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginLeft: spacing.md,
  },
  recentCtaText: {
    ...typography.button,
    fontSize: 16,
    lineHeight: 20,
    color: colors.surface,
  },
  recentCtaIcon: {
    fontSize: 16,
    color: colors.surface,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});