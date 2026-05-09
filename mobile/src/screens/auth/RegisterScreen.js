import { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { register } from '../../api/auth';
import AppText from '../../components/AppText';
import ButtonPrimary from '../../components/ButtonPrimary';
import theme from '../../theme';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await register({ username, email, password });
      alert('Account created. Please sign in.');
      navigation.navigate('Login');
    } catch (error) {
      setLoading(false);
      alert(error.message || 'Register failed');
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <AppText style={styles.link}>Back</AppText>
      </Pressable>
      <AppText style={styles.title}>Create account</AppText>
      <AppText style={styles.subtitle}>Start your language journey</AppText>

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor={theme.colors.onSurfaceVariant}
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
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
        title={loading ? 'Creating...' : 'Create account'}
        onPress={handleRegister}
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
