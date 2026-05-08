import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator } from 'react-native';
import { useFonts as usePublicSans, PublicSans_600SemiBold, PublicSans_700Bold } from '@expo-google-fonts/public-sans';
import { useFonts as useLexend, Lexend_400Regular, Lexend_600SemiBold } from '@expo-google-fonts/lexend';
import { AppNavigator } from './navigation/AppNavigator';
import { colors } from './theme';

export default function App() {
  const [publicSansLoaded] = usePublicSans({
    PublicSans_600SemiBold,
    PublicSans_700Bold,
  });
  const [lexendLoaded] = useLexend({
    Lexend_400Regular,
    Lexend_600SemiBold,
  });

  if (!publicSansLoaded || !lexendLoaded) {
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}