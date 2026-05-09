import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import AppText from '../../components/AppText';
import ButtonPrimary from '../../components/ButtonPrimary';
import OptionButton from '../../components/OptionButton';
import theme from '../../theme';
import { getVocabulariesByTopic } from '../../api/learning';

export default function LessonScreen({ route, navigation }) {
  const { topic } = route.params || {};
  const [vocabularies, setVocabularies] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getVocabulariesByTopic(topic?.id);
        setVocabularies(data || []);
      } catch (error) {
        alert(error.message || 'Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };
    if (topic?.id) {
      load();
    }
  }, [topic]);

  const current = vocabularies[index];

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <AppText style={styles.link}>Back</AppText>
      </Pressable>

      <AppText style={styles.title}>{topic?.name || 'Lesson'}</AppText>
      {loading ? (
        <AppText style={styles.subtitle}>Loading lesson...</AppText>
      ) : vocabularies.length === 0 ? (
        <AppText style={styles.subtitle}>No vocabulary found for this topic.</AppText>
      ) : (
        <AppText style={styles.subtitle}>Step {index + 1} of {vocabularies.length}</AppText>
      )}

      {current?.imageUrl ? (
        <Image source={{ uri: current.imageUrl }} style={styles.image} />
      ) : null}

      <AppText style={styles.word}>{current?.word || '...'}</AppText>
      <AppText style={styles.pronunciation}>{current?.meaning || ''}</AppText>

      <OptionButton label="Play audio" onPress={() => {}} />

      <ButtonPrimary
        title={index + 1 >= vocabularies.length ? 'Take quiz' : 'Next'}
        onPress={() => {
          if (index + 1 >= vocabularies.length) {
            navigation.navigate('Quiz', { topicId: topic?.id });
          } else {
            setIndex((prev) => prev + 1);
          }
        }}
        disabled={loading || vocabularies.length === 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 24
  },
  link: {
    ...theme.typography.bodyMD,
    color: theme.colors.primaryContainer
  },
  title: {
    marginTop: 12,
    ...theme.typography.headlineLG
  },
  subtitle: {
    marginTop: 6,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: theme.radius.xl,
    marginTop: 20
  },
  word: {
    marginTop: 20,
    ...theme.typography.headlineMD
  },
  pronunciation: {
    marginTop: 8,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 20
  }
});
