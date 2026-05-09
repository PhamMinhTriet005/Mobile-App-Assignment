import { View, StyleSheet } from 'react-native';
import AppText from '../../components/AppText';
import ButtonPrimary from '../../components/ButtonPrimary';
import { loginAsGuest } from '../../api/auth';
import useAuthStore from '../../state/authStore';
import theme from '../../theme';

export default function GuestScreen() {
  const { setSession } = useAuthStore();

  const handleGuest = async () => {
    try {
      const data = await loginAsGuest();
      await setSession(data);
    } catch (error) {
      alert(error.message || 'Guest login failed');
    }
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Continue as guest</AppText>
      <AppText style={styles.subtitle}>
        You can explore lessons and take quizzes without an account.
      </AppText>
      <ButtonPrimary title="Start learning" onPress={handleGuest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 24,
    paddingTop: 64
  },
  title: {
    ...theme.typography.headlineLG
  },
  subtitle: {
    marginTop: 12,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 24
  }
});
