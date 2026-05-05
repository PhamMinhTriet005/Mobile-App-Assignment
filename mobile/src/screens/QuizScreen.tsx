import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api, Question, Topic, Language } from '../services/api';
import { colors, spacing, typography, touchable } from '../theme';
import { Button } from '../components/Button';

export const QuizScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const topic: Topic = route.params?.topic;
  const language: Language = route.params?.language;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await api.generateTest(topic.id);
      setQuestions(data);
    } catch (error) {
      console.error('Failed to load questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (index: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
  };

  const handleNext = async () => {
    if (selectedIndex === questions[currentIndex].correctOptionIndex) {
      setScore(score + 1);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedIndex(null);
    } else {
      const finalScore = selectedIndex === questions[currentIndex].correctOptionIndex ? score + 1 : score;
      try {
        await api.submitTestResult(topic.id, finalScore, questions.length);
      } catch (e) {
        console.log('Failed to save result');
      }
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setShowResult(false);
    loadQuestions();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading quiz...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 60;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultEmoji}>{passed ? '🎉' : '💪'}</Text>
          <Text style={styles.resultTitle}>
            {passed ? 'Great job!' : 'Keep practicing!'}
          </Text>
          <Text style={styles.resultScore}>
            {score} / {questions.length}
          </Text>
          <Text style={styles.resultPercent}>{percentage}% correct</Text>
          <View style={styles.resultButtons}>
            <Button title="Try Again" onPress={handleRetry} size="large" />
            <View style={styles.buttonSpacer} />
            <Button
              title="Back to Vocabulary"
              onPress={handleBack}
              variant="outline"
              size="large"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={handleBack}
          style={styles.backButton}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Exit quiz"
        >
          <Text style={styles.backText}>✕ Exit</Text>
        </Pressable>
        <Text style={styles.progress}>
          Question {currentIndex + 1} of {questions.length}
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.content}</Text>
      </View>

      <View style={styles.options}>
        {question.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrect = index === question.correctOptionIndex;
          const showCorrect = selectedIndex !== null && isCorrect;
          const showWrong = isSelected && !isCorrect;

          return (
            <Pressable
              key={index}
              onPress={() => handleSelect(index)}
              disabled={selectedIndex !== null}
              style={[
                styles.option,
                isSelected && styles.optionSelected,
                showCorrect && styles.optionCorrect,
                showWrong && styles.optionWrong,
              ]}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Option ${index + 1}: ${option}`}
            >
              <Text
                style={[
                  styles.optionText,
                  (isSelected || showCorrect || showWrong) && styles.optionTextSelected,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.footer}>
        <Button
          title={currentIndex < questions.length - 1 ? 'Next' : 'Submit'}
          onPress={handleNext}
          disabled={selectedIndex === null}
          size="large"
        />
      </View>
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
  },
  backButton: {
    minHeight: touchable.minHeight,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  progress: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginTop: spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  questionText: {
    ...typography.title,
    color: colors.text,
    textAlign: 'center',
  },
  options: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  option: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 16,
    minHeight: touchable.minHeight,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  optionSelected: {
    backgroundColor: colors.primary,
  },
  optionCorrect: {
    backgroundColor: colors.success,
  },
  optionWrong: {
    backgroundColor: colors.error,
  },
  optionText: {
    ...typography.headline,
    color: colors.text,
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
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
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  resultEmoji: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  resultTitle: {
    ...typography.largeTitle,
    color: colors.text,
    marginBottom: spacing.md,
  },
  resultScore: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.primary,
  },
  resultPercent: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  resultButtons: {
    marginTop: spacing.xl,
    width: '100%',
  },
  buttonSpacer: {
    height: spacing.md,
  },
});