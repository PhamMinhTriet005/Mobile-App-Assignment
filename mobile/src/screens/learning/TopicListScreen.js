import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { getTopicsByLanguage } from '../../api/learning';
import AppText from '../../components/AppText';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import theme from '../../theme';

export default function TopicListScreen({ route, navigation }) {
  const { language } = route.params || {};
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTopicsByLanguage(language?.id);
        setTopics(data || []);
      } catch (error) {
        alert(error.message || 'Failed to load topics');
      } finally {
        setLoading(false);
      }
    };
    if (language?.id) {
      load();
    }
  }, [language]);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Vocabulary Topics"
        subtitle={language ? `Language: ${language.name}` : 'Choose a topic'}
      />

      {loading ? (
        <AppText style={styles.loading}>Loading...</AppText>
      ) : topics.length === 0 ? (
        <AppText style={styles.loading}>No topics found for this language.</AppText>
      ) : (
        <FlatList
          data={topics}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate('VocabularyList', { topic: item })}
            >
              <Card style={styles.topicCard}>
                <AppText style={styles.topicTitle}>{item.name}</AppText>
                <AppText style={styles.topicSubtitle}>Start</AppText>
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
  topicCard: {
    marginBottom: 16
  },
  topicTitle: {
    ...theme.typography.headlineMD
  },
  topicSubtitle: {
    marginTop: 6,
    ...theme.typography.bodyMD,
    color: theme.colors.primaryContainer
  },
  loading: {
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant
  }
});
