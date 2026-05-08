import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, StyleSheet, View } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { TopicsScreen } from '../screens/TopicsScreen';
import { VocabularyScreen } from '../screens/VocabularyScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { colors, spacing, typography, radius, shadow } from '../theme';
import { api, TestResult } from '../services/api';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const LearnStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Topics" component={TopicsScreen} />
      <Stack.Screen name="Vocabulary" component={VocabularyScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
    </Stack.Navigator>
  );
};

const TabIcon = ({ icon, focused }: { icon: string; focused: boolean }) => (
  <View style={[styles.tabIcon, focused && styles.tabIconFocused]}>
    <Text style={[styles.iconText, focused && styles.iconTextFocused]}>{icon}</Text>
    {focused && <View style={styles.activeIndicator} />}
  </View>
);

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textTertiary,
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tab.Screen
          name="Learn"
          component={LearnStack}
          options={{
            tabBarLabel: 'Learn',
            tabBarIcon: ({ focused }) => <TabIcon icon="📚" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Progress"
          component={ProgressScreen}
          options={{
            tabBarLabel: 'Progress',
            tabBarIcon: ({ focused }) => <TabIcon icon="📊" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ focused }) => <TabIcon icon="⚙️" focused={focused} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const ProgressScreen = () => {
  const [history, setHistory] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const loadProgress = async () => {
      try {
        const data = await api.getTestHistory();
        if (mounted) setHistory(data);
      } catch (error) {
        console.log('Failed to load test history', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadProgress();
    return () => {
      mounted = false;
    };
  }, []);

  const streakDays = useMemo(() => {
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
  }, [history]);

  const uniqueTopics = useMemo(() => {
    return new Set(history.map((item) => item.topicId)).size;
  }, [history]);

  return (
    <View style={styles.progressContainer}>
      <Text style={styles.progressTitle}>Your Progress</Text>
      <Text style={styles.progressSubtitle}>
        {loading ? 'Loading your progress…' : "You're doing a wonderful job today."}
      </Text>
      <View style={styles.progressStatsRow}>
        <View style={styles.progressStatCard}>
          <Text style={styles.progressStatLabel}>Daily streak</Text>
          <Text style={styles.progressStatValue}>🔥 {streakDays}</Text>
        </View>
        <View style={styles.progressStatCard}>
          <Text style={styles.progressStatLabel}>Topics learned</Text>
          <Text style={styles.progressStatValue}>{uniqueTopics}</Text>
        </View>
      </View>
      <View style={styles.progressStatWide}>
        <Text style={styles.progressStatLabel}>Quizzes taken</Text>
        <Text style={styles.progressStatValue}>{history.length} total</Text>
      </View>
      <View style={styles.progressCta}>
        <Text style={styles.progressCtaText}>Continue learning →</Text>
      </View>
    </View>
  );
};

const SettingsScreen = () => (
  <View style={styles.settingsContainer}>
    <Text style={styles.settingsTitle}>Settings</Text>
    <Text style={styles.settingsSubtitle}>Personalize your learning experience.</Text>
    <View style={styles.settingsCard}>
      <Text style={styles.settingsLabel}>Notifications</Text>
      <Text style={styles.settingsValue}>Daily reminders enabled</Text>
    </View>
    <View style={styles.settingsCard}>
      <Text style={styles.settingsLabel}>Learning goals</Text>
      <Text style={styles.settingsValue}>10 new words per day</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    height: 96,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    ...shadow.lift,
  },
  tabLabel: {
    ...typography.body,
    fontSize: 16,
    fontWeight: '600',
  },
  tabIcon: {
    width: 32,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconFocused: {
    paddingBottom: spacing.xs,
  },
  iconText: {
    fontSize: 26,
    opacity: 0.5,
  },
  iconTextFocused: {
    opacity: 1,
  },
  activeIndicator: {
    marginTop: spacing.xs,
    height: 4,
    width: 24,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  progressContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  progressTitle: {
    ...typography.largeTitle,
    color: colors.text,
  },
  progressSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  progressStatsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  progressStatCard: {
    flex: 1,
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadow.lift,
  },
  progressStatWide: {
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadow.lift,
  },
  progressStatLabel: {
    ...typography.caption,
    color: colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  progressStatValue: {
    ...typography.headline,
    color: colors.text,
    marginTop: spacing.sm,
  },
  progressCta: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    padding: spacing.md,
    alignItems: 'center',
    ...shadow.lift,
  },
  progressCtaText: {
    ...typography.button,
    color: colors.surface,
  },
  settingsContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  settingsTitle: {
    ...typography.largeTitle,
    color: colors.text,
  },
  settingsSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  settingsCard: {
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow.lift,
  },
  settingsLabel: {
    ...typography.headline,
    color: colors.text,
  },
  settingsValue: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});

export { TopicsScreen, VocabularyScreen, QuizScreen };