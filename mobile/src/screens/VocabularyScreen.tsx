import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { api, Vocabulary, Topic, Language } from '../services/api';
import { colors, spacing, typography, touchable } from '../theme';
import { VocabularyCard } from '../components/VocabularyCard';
import { Button } from '../components/Button';

export const VocabularyScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const topic: Topic = route.params?.topic;
  const language: Language = route.params?.language;

  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadVocabularies = async () => {
    try {
      const data = await api.getVocabulariesByTopic(topic.id);
      setVocabularies(data);
    } catch (error) {
      console.error('Failed to load vocabularies:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadVocabularies();
  }, [topic.id]);

  const onRefresh = () => {
    setRefreshing(true);
    loadVocabularies();
  };

  const handleStartQuiz = () => {
    navigation.navigate('Quiz', { topic, language });
  };

  const renderItem = ({ item, index }: { item: Vocabulary; index: number }) => (
    <VocabularyCard vocabulary={item} index={index} />
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading vocabulary...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backText}>‹ Topics</Text>
        </Pressable>
        <Text style={styles.topicName}>{topic.name}</Text>
        <Text style={styles.subtitle}>
          {vocabularies.length} words to learn
        </Text>
      </View>
      <FlatList
        data={vocabularies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
        }
      />
      <View style={styles.footer}>
        <Button title="Start Quiz" onPress={handleStartQuiz} size="large" />
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
    marginBottom: spacing.sm,
  },
  backText: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: '500',
  },
  topicName: {
    ...typography.largeTitle,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
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
});