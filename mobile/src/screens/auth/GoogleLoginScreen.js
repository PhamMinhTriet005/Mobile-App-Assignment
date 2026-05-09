import { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import AppText from '../../components/AppText';
import ButtonPrimary from '../../components/ButtonPrimary';
import { loginWithGoogle } from '../../api/auth';
import useAuthStore from '../../state/authStore';
import theme from '../../theme';

export default function GoogleLoginScreen({ navigation }) {
  const [idToken, setIdToken] = useState('');
  const [loading, setLoading] = useState(false);
  const { setSession } = useAuthStore();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const data = await loginWithGoogle({ idToken });
      await setSession(data);
    } catch (error) {
      setLoading(false);
      alert(error.message || 'Google login failed');
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <AppText style={styles.link}>Back</AppText>
      </Pressable>
      <AppText style={styles.title}>Google sign-in</AppText>
      <AppText style={styles.subtitle}>Paste your Google ID token</AppText>

      <TextInput
        value={idToken}
        onChangeText={setIdToken}
        placeholder="Google ID token"
        placeholderTextColor={theme.colors.onSurfaceVariant}
        style={styles.input}
      />

      <ButtonPrimary
        title={loading ? 'Signing in...' : 'Sign in with Google'}
        onPress={handleGoogleLogin}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 24,
    paddingTop: 48
  },
  title: {
    marginTop: 16,
    ...theme.typography.headlineLG
  },
  subtitle: {
    marginTop: 8,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 24
  },
  input: {
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surfaceContainerLow,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    color: theme.colors.onSurface,
    ...theme.typography.bodyMD
  },
  link: {
    ...theme.typography.bodyMD,
    color: theme.colors.primaryContainer
  }
});
