import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import AppText from '../../components/AppText';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import ButtonPrimary from '../../components/ButtonPrimary';
import theme from '../../theme';
import useAuthStore from '../../state/authStore';

export default function HomeScreen({ navigation }) {
  const { user, clearSession } = useAuthStore();
  const [greeting, setGreeting] = useState('Welcome back');

  useEffect(() => {
    if (user?.username) {
      setGreeting(`Welcome back, ${user.username}!`);
    }
  }, [user]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader
        title={greeting}
        right={
          <Pressable onPress={clearSession}>
            <AppText style={styles.logout}>Logout</AppText>
          </Pressable>
        }
      />

      <Card style={styles.progressCard}>
        <View style={styles.progressRow}>
          <View>
            <AppText style={styles.progressTitle}>Keep up the great work!</AppText>
            <AppText style={styles.progressText}>Start learning today</AppText>
          </View>
        </View>
      </Card>

      <AppText style={styles.sectionTitle}>Choose your next step</AppText>
      <Card style={styles.actionCard}>
        <AppText style={styles.actionTitle}>Vocabulary</AppText>
        <AppText style={styles.actionBody}>Learn and review 10 new words today.</AppText>
        <ButtonPrimary
          title="Browse languages"
          onPress={() => navigation.navigate('Languages')}
        />
      </Card>

      <Card style={styles.actionCard}>
        <AppText style={styles.actionTitle}>Quizzes</AppText>
        <AppText style={styles.actionBody}>Test your knowledge with fun games.</AppText>
        <ButtonPrimary
          title="Start a quiz"
          onPress={() => navigation.navigate('Languages')}
        />
      </Card>

      <Card style={styles.actionCard}>
        <AppText style={styles.actionTitle}>Speaking Practice</AppText>
        <AppText style={styles.actionBody}>Practice pronunciation out loud.</AppText>
        <ButtonPrimary
          title="Practice now"
          onPress={() => navigation.navigate('Lesson')}
        />
      </Card>
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
  logout: {
    color: theme.colors.primaryContainer,
    ...theme.typography.bodyMD
  },
  progressCard: {
    marginBottom: 24
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  progressTitle: {
    ...theme.typography.headlineMD
  },
  progressText: {
    marginTop: 8,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant
  },
  sectionTitle: {
    marginBottom: 12,
    ...theme.typography.headlineMD
  },
  actionCard: {
    marginBottom: 20
  },
  actionTitle: {
    ...theme.typography.headlineMD,
    marginBottom: 8
  },
  actionBody: {
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 16
  }
});
