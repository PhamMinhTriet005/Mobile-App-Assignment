import { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from '../../components/AppText';
import ButtonPrimary from '../../components/ButtonPrimary';
import ScreenHeader from '../../components/ScreenHeader';
import { loginWithGoogle } from '../../api/auth';
import useAuthStore from '../../state/authStore';
import theme from '../../theme';

/**
 * Note: To implement a real one-tap Google Sign-in flow,
 * you should install 'expo-auth-session' and 'expo-crypto'.
 */
export default function GoogleLoginScreen({ navigation }) {
  const [idToken, setIdToken] = useState('');
  const [loading, setLoading] = useState(false);
  const { setSession } = useAuthStore();

  const handleGoogleLogin = async () => {
    if (!idToken.trim()) {
      alert('Please enter a valid Google ID token');
      return;
    }

    setLoading(true);
    try {
      const data = await loginWithGoogle({ idToken: idToken.trim() });
      await setSession(data);
    } catch (error) {
      setLoading(false);
      alert(error.message || 'Google login failed');
    }
  };

  const renderBackButton = () => (
    <Pressable onPress={() => navigation.goBack()} style={styles.navButton}>
      <Ionicons name="arrow-back" size={28} color={theme.colors.primary} />
    </Pressable>
  );

  const renderHomeButton = () => (
    <Pressable onPress={() => navigation.navigate('Home')} style={styles.navButton}>
      <Ionicons name="home" size={28} color={theme.colors.primary} />
    </Pressable>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <ScreenHeader
        title="Google Auth"
        left={renderBackButton()}
        right={renderHomeButton()}
      />

      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Ionicons name="logo-google" size={60} color="#4285F4" />
        </View>
        <AppText style={styles.title}>Sign in with Google</AppText>
        <AppText style={styles.subtitle}>
          Securely sync your learning progress across all your devices.
        </AppText>
      </View>

      <View style={styles.card}>
        <AppText style={styles.label}>Google ID Token</AppText>
        <View style={styles.inputWrapper}>
          <Ionicons name="key-outline" size={22} color={theme.colors.onSurfaceVariant} style={styles.inputIcon} />
          <TextInput
            value={idToken}
            onChangeText={setIdToken}
            placeholder="Paste your ID token here"
            placeholderTextColor={theme.colors.onSurfaceVariant}
            style={styles.input}
            multiline
            numberOfLines={4}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <AppText style={styles.helperText}>
          For development, obtain an ID token from your Google Cloud Console or via a web-based Google Login.
        </AppText>
      </View>

      <ButtonPrimary
        title={loading ? 'Authenticating...' : 'Sign In with Google'}
        onPress={handleGoogleLogin}
        disabled={loading || !idToken.trim()}
        iconName="logo-google"
        style={styles.submitButton}
      />

      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}
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
    paddingTop: 16,
    flexGrow: 1
  },
  navButton: {
    padding: 8
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20
  },
  title: {
    ...theme.typography.headlineLG,
    textAlign: 'center'
  },
  subtitle: {
    marginTop: 12,
    ...theme.typography.bodyMD,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: 20
  },
  card: {
    backgroundColor: theme.colors.surfaceContainerLow,
    borderRadius: theme.radius.xl,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant
  },
  label: {
    ...theme.typography.labelLG,
    color: theme.colors.primary,
    marginBottom: 12
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
    paddingHorizontal: 12,
    alignItems: 'flex-start'
  },
  inputIcon: {
    marginTop: 18,
    marginRight: 8
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    color: theme.colors.onSurface,
    ...theme.typography.bodyMD,
    minHeight: 100,
    textAlignVertical: 'top'
  },
  helperText: {
    marginTop: 12,
    ...theme.typography.bodySM,
    color: theme.colors.onSurfaceVariant,
    fontStyle: 'italic'
  },
  submitButton: {
    marginTop: 'auto',
    marginBottom: 20
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  }
});
