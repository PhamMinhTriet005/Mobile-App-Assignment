import { useEffect, useMemo } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import AppText from '../../components/AppText';
import Card from '../../components/Card';
import StatPill from '../../components/StatPill';
import ButtonPrimary from '../../components/ButtonPrimary';
import theme from '../../theme';
import { submitTestResult } from '../../api/quiz';
import useAuthStore from '../../state/authStore';

export default function QuizResultScreen({ route, navigation }) {
  const { questions, answers, topicId } = route.params || {};
  const { user } = useAuthStore();

  const result = useMemo(() => {
    const total = questions?.length || 0;
    const correct = questions?.reduce((count, q) => {
      return answers?.[q.id] === q.correctOptionIndex ? count + 1 : count;
    }, 0);
    const percentage = total ? Math.round((correct / total) * 100) : 0;
    return { total, correct, percentage };
  }, [questions, answers]);

  useEffect(() => {
    const submit = async () => {
      if (!result.total) return;
      try {
        await submitTestResult({
          deviceId: user?.id || 'guest',
          topicId,
          score: result.correct,
          totalQuestions: result.total,
          percentage: result.percentage
        });
      } catch (error) {
        console.log('Submit result failed', error.message);
      }
    };
    submit();
  }, [result, topicId, user]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AppText style={styles.title}>Great job!</AppText>
      <AppText style={styles.score}>{result.correct} / {result.total}</AppText>

      <Card style={styles.card}>
        <AppText style={styles.subtitle}>Keep practicing to improve!</AppText>
        <View style={styles.statsRow}>
          <StatPill label="Accuracy" value={`${result.percentage}%`} />
        </View>
      </Card>

      <View style={styles.actions}>
        <ButtonPrimary title="Try again" onPress={() => navigation.goBack()} />
        <Pressable onPress={() => navigation.navigate('Home')}>
          <AppText style={styles.link}>Back to Vocabulary</AppText>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  content: {
    padding: 24,
    paddingBottom: 48
  },
  title: {
    ...theme.typography.headlineLG
  },
  score: {
    marginTop: 8,
    ...theme.typography.headlineXL,
    color: theme.colors.primaryContainer
  },
  card: {
    marginTop: 20
  },
  subtitle: {
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 16
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  actions: {
    marginTop: 24
  },
  link: {
    marginTop: 12,
    ...theme.typography.bodyMD,
    color: theme.colors.primaryContainer,
    textAlign: 'center'
  }
});
