import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { api, Language, TestResult } from '../services/api';
import { colors, spacing, typography, radius, shadow } from '../theme';
import { LanguageCard } from '../components/LanguageCard';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [topicCount, setTopicCount] = useState(0);
  const [vocabularyCount, setVocabularyCount] = useState(0);
  const [streakDays, setStreakDays] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const calculateStreak = (history: TestResult[]) => {
    if (!history.length) return 0;
    const days = new Set(
      history.map((item) => new Date(item.completedAt).toISOString().slice(0, 10))
    );
    const sortedDays = Array.from(days).sort().reverse();
    let streak = 0;
    let current = new Date();
    current.setHours(0, 0, 0, 0);
    for (const day of sortedDays) {
      const dayDate = new Date(day);
      dayDate.setHours(0, 0, 0, 0);
      const diffDays = Math.round((current.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 0 || diffDays === 1) {
        streak += 1;
        current = dayDate;
      } else {
        break;
      }
    }
    return streak;
  };

  const loadLanguages = async () => {
    try {
      const [languagesData, topicsData, vocabData, testHistory] = await Promise.all([
        api.getLanguages(),
        api.getAllTopics(),
        api.getAllVocabularies(),
        api.getTestHistory(),
      ]);
      setLanguages(languagesData);
      setTopicCount(topicsData.length);
      setVocabularyCount(vocabData.length);
      setStreakDays(calculateStreak(testHistory));
      setQuizCount(testHistory.length);
    } catch (error) {
      console.error('Failed to load languages:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadLanguages();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadLanguages();
  };

  const handleLanguagePress = (language: Language) => {
    navigation.navigate('Topics', { language });
  };

  const renderItem = ({ item }: { item: Language }) => (
    <LanguageCard language={item} onPress={() => handleLanguagePress(item)} />
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading languages...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={languages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.hero}>
              <Text style={styles.heroTitle}>Welcome back!</Text>
              <Text style={styles.heroSubtitle}>Choose a language to continue learning.</Text>
            </View>
            <View style={styles.progressRow}>
              <View style={styles.progressCard}>
                <Text style={styles.progressLabel}>Daily streak</Text>
                <Text style={styles.progressValue}>🔥 {streakDays} days</Text>
              </View>
              <View style={styles.progressCard}>
                <Text style={styles.progressLabel}>Lessons</Text>
                <Text style={styles.progressValue}>{topicCount} topics</Text>
              </View>
            </View>
            <View style={styles.progressRow}>
              <View style={styles.progressCard}>
                <Text style={styles.progressLabel}>Quizzes taken</Text>
                <Text style={styles.progressValue}>{quizCount} total</Text>
              </View>
              <View style={styles.progressCard}>
                <Text style={styles.progressLabel}>Vocabulary</Text>
                <Text style={styles.progressValue}>{vocabularyCount} words</Text>
              </View>
            </View>
            <View style={styles.sectionHeader}>
              <Text style={styles.title}>Languages</Text>
              <Text style={styles.subtitle}>Pick one to start learning</Text>
            </View>
            <View style={styles.actionSection}>
              <Text style={styles.sectionTitle}>Daily activities</Text>
              <View style={styles.actionCard}>
                <Text style={styles.actionIcon}>translate</Text>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>Vocabulary</Text>
                  <Text style={styles.actionSubtitle}>Learn and review new words.</Text>
                </View>
              </View>
              <View style={styles.actionCard}>
                <Text style={styles.actionIcon}>quiz</Text>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>Quizzes</Text>
                  <Text style={styles.actionSubtitle}>Test your knowledge with games.</Text>
                </View>
              </View>
              <View style={styles.actionCard}>
                <Text style={styles.actionIcon}>record_voice_over</Text>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>Speaking Practice</Text>
                  <Text style={styles.actionSubtitle}>Practice pronunciation out loud.</Text>
                </View>
              </View>
            </View>
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
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  hero: {
    backgroundColor: colors.surfaceHigh,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    ...shadow.lift,
  },
  heroTitle: {
    ...typography.largeTitle,
    color: colors.text,
  },
  heroSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  progressRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  progressCard: {
    flex: 1,
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadow.lift,
  },
  progressLabel: {
    ...typography.caption,
    color: colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  progressValue: {
    ...typography.headline,
    color: colors.text,
    marginTop: spacing.sm,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.headline,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  actionSection: {
    marginBottom: spacing.lg,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.lift,
  },
  actionIcon: {
    ...typography.caption,
    color: colors.textTertiary,
    marginRight: spacing.md,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    ...typography.headline,
    color: colors.text,
  },
  actionSubtitle: {
    ...typography.callout,
    color: colors.textSecondary,
    marginTop: spacing.xs,
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