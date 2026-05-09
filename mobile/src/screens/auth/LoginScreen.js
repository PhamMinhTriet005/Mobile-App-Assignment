import { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { login, loginAsGuest } from '../../api/auth';
import useAuthStore from '../../state/authStore';
import AppText from '../../components/AppText';
import ButtonPrimary from '../../components/ButtonPrimary';
import theme from '../../theme';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setSession } = useAuthStore();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await login({ username, password });
      await setSession(data);
    } catch (error) {
      setLoading(false);
      alert(error.message || 'Login failed');
    }
  };

  const handleGuest = async () => {
    setLoading(true);
    try {
      const data = await loginAsGuest();
      await setSession(data);
    } catch (error) {
      setLoading(false);
      alert(error.message || 'Guest login failed');
    }
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Welcome back</AppText>
      <AppText style={styles.subtitle}>Sign in to continue learning</AppText>

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor={theme.colors.onSurfaceVariant}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor={theme.colors.onSurfaceVariant}
        secureTextEntry
        style={styles.input}
      />

      <ButtonPrimary
        title={loading ? 'Signing in...' : 'Sign in'}
        onPress={handleLogin}
        disabled={loading}
      />

      <View style={styles.actionsRow}>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <AppText style={styles.link}>Create account</AppText>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('GoogleLogin')}>
          <AppText style={styles.link}>Google sign-in</AppText>
        </Pressable>
      </View>

      <Pressable onPress={handleGuest} style={styles.guestButton}>
        <AppText style={styles.guestText}>Continue as guest</AppText>
      </Pressable>
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
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  link: {
    ...theme.typography.bodyMD,
    color: theme.colors.primaryContainer
  },
  guestButton: {
    marginTop: 28,
    alignItems: 'center'
  },
  guestText: {
    ...theme.typography.bodyMD,
    color: theme.colors.secondary
  }
});
