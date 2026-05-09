import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../../components/AppText';
import ButtonPrimary from '../../components/ButtonPrimary';
import OptionButton from '../../components/OptionButton';
import theme from '../../theme';
import { generateTest } from '../../api/quiz';

export default function QuizScreen({ route, navigation }) {
  const { topicId } = route.params || {};
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await generateTest({ topicId, numberOfQuestions: 5 });
        setQuestions(data || []);
      } catch (error) {
        alert(error.message || 'Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };
    if (topicId) {
      load();
    }
  }, [topicId]);

  const current = questions[index];

  const handleSelect = (optionIndex) => {
    setAnswers((prev) => ({ ...prev, [current.id]: optionIndex }));
  };

  const handleNext = () => {
    if (index + 1 >= questions.length) {
      navigation.navigate('QuizResult', { questions, answers, topicId });
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Quiz</AppText>
      {loading ? (
        <AppText style={styles.subtitle}>Loading quiz...</AppText>
      ) : questions.length === 0 ? (
        <AppText style={styles.subtitle}>No quiz questions available.</AppText>
      ) : (
        <>
          <AppText style={styles.subtitle}>
            Question {index + 1} of {questions.length}
          </AppText>

          <AppText style={styles.question}>{current?.content || '...'}</AppText>

          {(current?.options || []).map((option, idx) => (
            <OptionButton
              key={option}
              label={option}
              selected={answers[current?.id] === idx}
              onPress={() => handleSelect(idx)}
            />
          ))}

          <ButtonPrimary
            title="Next"
            onPress={handleNext}
            disabled={answers[current?.id] === undefined}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 24
  },
  title: {
    ...theme.typography.headlineLG
  },
  subtitle: {
    marginTop: 6,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 24
  },
  question: {
    ...theme.typography.headlineMD,
    marginBottom: 16
  }
});
