import { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { login, loginAsGuest, loginWithGoogle } from '../../api/auth';
import useAuthStore from '../../state/authStore';
import AppText from '../../components/AppText';
import ButtonPrimary from '../../components/ButtonPrimary';
import theme from '../../theme';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setSession } = useAuthStore();

  // Reverted to environment variables for security
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log('Google ID Token captured');
      handleGoogleLogin(id_token);
    }
  }, [response]);

  const handleGoogleLogin = async (idToken) => {
    setLoading(true);
    try {
      const data = await loginWithGoogle({ idToken });
      await setSession(data);
    } catch (error) {
      setLoading(false);
      alert(error.message || 'Google login failed');
    }
  };

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
      <View style={styles.logoContainer}>
        <Ionicons name="school" size={80} color={theme.colors.primary} />
        <AppText style={styles.appName}>S-Edu</AppText>
        <AppText style={styles.tagline}>Language Learning for Everyone</AppText>
      </View>

      <View style={styles.formContainer}>
        <AppText style={styles.title}>Welcome Back!</AppText>
        <AppText style={styles.subtitle}>Sign in to continue your learning journey</AppText>

        <View style={styles.inputContainer}>
          <Ionicons name="person" size={24} color={theme.colors.onSurfaceVariant} style={styles.inputIcon} />
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            placeholderTextColor={theme.colors.onSurfaceVariant}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color={theme.colors.onSurfaceVariant} style={styles.inputIcon} />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={theme.colors.onSurfaceVariant}
            secureTextEntry
            style={styles.input}
          />
        </View>

        <ButtonPrimary
          title={loading ? 'Signing in...' : 'Sign In'}
          onPress={handleLogin}
          disabled={loading}
          iconName="log-in"
        />

        <View style={styles.actionsRow}>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <AppText style={styles.link}>Create Account</AppText>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('GoogleLogin')}>
            <AppText style={styles.link}>Google Sign-in</AppText>
          </Pressable>
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <AppText style={styles.dividerText}>or</AppText>
          <View style={styles.dividerLine} />
        </View>

        <ButtonPrimary
          title="Sign in with Google"
          onPress={() => promptAsync()}
          disabled={!request || loading}
          variant="google"
          iconName="logo-google"
          style={styles.googleButton}
        />

        <ButtonPrimary
          title="Continue as Guest"
          onPress={handleGuest}
          variant="secondary"
          iconName="person-outline"
        />
      </View>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20
  },
  appName: {
    marginTop: 12,
    ...theme.typography.headlineXL,
    color: theme.colors.primary
  },
  tagline: {
    marginTop: 4,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant
  },
  formContainer: {
    flex: 1
  },
  title: {
    ...theme.typography.headlineLG
  },
  subtitle: {
    marginTop: 8,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 32
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceContainerLow,
    borderRadius: theme.radius.lg,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: theme.colors.outlineVariant
  },
  inputIcon: {
    paddingHorizontal: 16
  },
  input: {
    flex: 1,
    paddingVertical: 18,
    paddingRight: 16,
    color: theme.colors.onSurface,
    ...theme.typography.bodyMD
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingHorizontal: 16
  },
  link: {
    ...theme.typography.bodyMD,
    color: theme.colors.primary,
    fontWeight: '600'
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.outlineVariant
  },
  dividerText: {
    marginHorizontal: 16,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant
  },
  googleButton: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant
  }
});
