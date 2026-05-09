import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { getVocabulariesByTopic } from '../../api/learning';
import AppText from '../../components/AppText';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import ButtonPrimary from '../../components/ButtonPrimary';
import theme from '../../theme';

export default function VocabularyListScreen({ route, navigation }) {
  const { topic } = route.params || {};
  const [vocabularies, setVocabularies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getVocabulariesByTopic(topic?.id);
        setVocabularies(data || []);
      } catch (error) {
        alert(error.message || 'Failed to load vocabulary');
      } finally {
        setLoading(false);
      }
    };
    if (topic?.id) {
      load();
    }
  }, [topic]);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={topic?.name || 'Lesson'}
        subtitle={topic ? `${vocabularies.length} words to learn` : ''}
      />

      {loading ? (
        <AppText style={styles.loading}>Loading...</AppText>
      ) : vocabularies.length === 0 ? (
        <AppText style={styles.loading}>No vocabulary in this topic yet.</AppText>
      ) : (
        <FlatList
          data={vocabularies}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <Card style={styles.lessonCard}>
              <AppText style={styles.lessonTitle}>Step 1 of 5</AppText>
              <AppText style={styles.lessonBody}>
                Practice words with audio and visuals.
              </AppText>
              <ButtonPrimary
                title="Start lesson"
                onPress={() => navigation.navigate('Lesson', { topic })}
                disabled={vocabularies.length === 0}
              />
            </Card>
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate('VocabularyDetail', { vocab: item })}
            >
              <Card style={styles.vocabCard}>
                <View style={styles.vocabRow}>
                  <View style={styles.vocabInfo}>
                    <AppText style={styles.vocabWord}>{item.word}</AppText>
                    <AppText style={styles.vocabMeaning}>{item.meaning}</AppText>
                  </View>
                  {item.imageUrl ? (
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.vocabImage}
                    />
                  ) : null}
                </View>
              </Card>
            </Pressable>
          )}
        />
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
  list: {
    paddingBottom: 24
  },
  lessonCard: {
    marginBottom: 20
  },
  lessonTitle: {
    ...theme.typography.headlineMD
  },
  lessonBody: {
    marginTop: 8,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 16
  },
  vocabCard: {
    marginBottom: 16
  },
  vocabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  vocabInfo: {
    flex: 1,
    marginRight: 12
  },
  vocabWord: {
    ...theme.typography.headlineMD
  },
  vocabMeaning: {
    marginTop: 6,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant
  },
  vocabImage: {
    width: 72,
    height: 72,
    borderRadius: theme.radius.lg
  },
  loading: {
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant
  }
});
