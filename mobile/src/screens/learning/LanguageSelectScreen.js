import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { getLanguages } from '../../api/learning';
import AppText from '../../components/AppText';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import theme from '../../theme';

export default function LanguageSelectScreen({ navigation }) {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getLanguages();
        setLanguages(data || []);
      } catch (error) {
        alert(error.message || 'Failed to load languages');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Vocabulary Topics"
        subtitle="Choose a language to start learning"
      />

      {loading ? (
        <AppText style={styles.loading}>Loading...</AppText>
      ) : languages.length === 0 ? (
        <AppText style={styles.loading}>No languages available yet.</AppText>
      ) : (
        <FlatList
          data={languages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate('Topics', { language: item })}
            >
              <Card style={styles.languageCard}>
                <AppText style={styles.languageTitle}>{item.name}</AppText>
                <AppText style={styles.languageSubtitle}>{item.code}</AppText>
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
  languageCard: {
    marginBottom: 16
  },
  languageTitle: {
    ...theme.typography.headlineMD
  },
  languageSubtitle: {
    marginTop: 6,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant
  },
  loading: {
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant
  }
});
