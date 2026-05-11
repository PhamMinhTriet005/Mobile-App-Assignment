import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getLanguages } from '../../api/learning';
import { logout as logoutApi } from '../../api/auth';
import AppText from '../../components/AppText';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import theme from '../../theme';
import useAuthStore from '../../state/authStore';

export default function LanguageSelectScreen({ navigation }) {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuthStore();

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

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      // Ignore API errors
    }
    // Clear local session
    const authStore = useAuthStore.getState();
    await authStore.clearSession();
    // Navigate to Login using screen's navigation prop
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const renderLogoutButton = () => (
    <Pressable onPress={handleLogout} style={styles.navButton}>
      <Ionicons name="log-out-outline" size={28} color={theme.colors.primary} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <AppText style={styles.greeting}>{greeting}</AppText>
        <AppText style={styles.greetingSubtitle}>Choose a language to start learning</AppText>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Ionicons name="hourglass" size={48} color={theme.colors.onSurfaceVariant} />
          <AppText style={styles.loading}>Loading languages...</AppText>
        </View>
      ) : languages.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Ionicons name="alert-circle" size={48} color={theme.colors.onSurfaceVariant} />
          <AppText style={styles.loading}>No languages available yet.</AppText>
        </View>
      ) : (
        <FlatList
          data={languages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate('Topics', { language: item })}
            >
              <Card style={styles.languageCard} accentColor={theme.colors.primary}>
                <View style={styles.languageContent}>
                  <View style={styles.languageIcon}>
                    <Ionicons name="globe" size={36} color={theme.colors.primary} />
                  </View>
                  <View style={styles.languageText}>
                    <AppText style={styles.languageTitle}>{item.name}</AppText>
                    <AppText style={styles.languageSubtitle}>{item.code?.toUpperCase()}</AppText>
                  </View>
                  <Ionicons name="chevron-forward" size={28} color={theme.colors.onSurfaceVariant} />
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
  greetingContainer: {
    marginBottom: 24,
    marginTop: 16
  },
  greeting: {
    ...theme.typography.headlineLG
  },
  greetingSubtitle: {
    marginTop: 8,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant
  },
  list: {
    paddingTop: 16,
    paddingBottom: 24
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    marginTop: 16,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant
  },
  languageCard: {
    marginBottom: 16
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  languageIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: theme.colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center'
  },
  languageText: {
    marginLeft: 16,
    flex: 1
  },
  languageTitle: {
    ...theme.typography.headlineMD
  },
  languageSubtitle: {
    marginTop: 4,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant
  }
});