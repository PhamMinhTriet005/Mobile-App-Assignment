import { View, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import AppText from '../../components/AppText';
import ButtonPrimary from '../../components/ButtonPrimary';
import Card from '../../components/Card';
import theme from '../../theme';

export default function VocabularyDetailScreen({ route, navigation }) {
  const { vocab } = route.params || {};

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Pressable onPress={() => navigation.goBack()}>
        <AppText style={styles.link}>Back</AppText>
      </Pressable>

      <AppText style={styles.title}>{vocab?.word || 'Vocabulary'}</AppText>
      <AppText style={styles.subtitle}>{vocab?.type || 'Noun'}</AppText>

      {vocab?.imageUrl ? (
        <Image source={{ uri: vocab.imageUrl }} style={styles.image} />
      ) : null}

      <Card style={styles.card}>
        <AppText style={styles.sectionTitle}>Definition</AppText>
        <AppText style={styles.bodyText}>{vocab?.meaning || '...'}</AppText>
      </Card>

      <Card style={styles.card}>
        <AppText style={styles.sectionTitle}>Example</AppText>
        <AppText style={styles.bodyText}>
          Use "{vocab?.word || 'word'}" in a sentence to reinforce meaning.
        </AppText>
      </Card>

      <ButtonPrimary
        title="Practice this word"
        onPress={() => navigation.navigate('Quiz', { topicId: vocab?.topicId })}
      />
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
  link: {
    ...theme.typography.bodyMD,
    color: theme.colors.primaryContainer
  },
  title: {
    marginTop: 16,
    ...theme.typography.headlineLG
  },
  subtitle: {
    marginTop: 4,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: theme.radius.xl,
    marginTop: 20
  },
  card: {
    marginTop: 16
  },
  sectionTitle: {
    ...theme.typography.labelLG,
    color: theme.colors.primary
  },
  bodyText: {
    marginTop: 8,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant
  }
});
