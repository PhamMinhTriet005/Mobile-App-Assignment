import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api, Question, Topic, Language } from '../services/api';
import { colors, spacing, typography, touchable, radius, shadow } from '../theme';
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
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.progress}>Step {currentIndex + 1} of {questions.length}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.questionContainer}>
          {question.imageUrl ? (
            <Image source={{ uri: question.imageUrl }} style={styles.questionImage} />
          ) : null}
          <Text style={styles.questionTitle}>{topic.name}</Text>
          <Text style={styles.questionText}>{question.content}</Text>
          <Text style={styles.questionSubtitle}>Which word matches the meaning?</Text>
          <View style={styles.audioButton}>
            <Button
              title="Play Audio"
              onPress={() => {}}
              variant="ghost"
              size="medium"
              icon="🔊"
              iconPosition="left"
            />
          </View>
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
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={currentIndex < questions.length - 1 ? 'Next' : 'Finish'}
          onPress={handleNext}
          disabled={selectedIndex === null}
          size="large"
          icon="→"
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
    paddingBottom: spacing.md,
  },
  backButton: {
    minHeight: touchable.minHeight,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  progress: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  progressBar: {
    height: 16,
    backgroundColor: colors.surfaceLow,
    borderRadius: radius.full,
    marginTop: spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.secondary,
    borderRadius: radius.full,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  questionContainer: {
    alignItems: 'center',
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  questionImage: {
    width: '100%',
    height: 180,
    borderRadius: radius.xl,
    marginBottom: spacing.md,
    backgroundColor: colors.surfaceHigh,
  },
  questionTitle: {
    ...typography.headline,
    color: colors.text,
    textAlign: 'center',
  },
  questionText: {
    ...typography.title,
    color: colors.text,
    textAlign: 'center',
  },
  questionSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  audioButton: {
    alignSelf: 'center',
  },
  options: {
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  option: {
    backgroundColor: colors.surfaceLow,
    padding: spacing.lg,
    borderRadius: radius.xl,
    minHeight: 72,
    justifyContent: 'center',
    ...shadow.lift,
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