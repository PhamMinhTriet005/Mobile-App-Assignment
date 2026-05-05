import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, StyleSheet, View } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { TopicsScreen } from '../screens/TopicsScreen';
import { VocabularyScreen } from '../screens/VocabularyScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const LearnStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Topics" component={TopicsScreen} />
      <Stack.Screen name="Vocabulary" component={VocabularyScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
    </Stack.Navigator>
  );
};

const TabIcon = ({ icon, focused }: { icon: string; focused: boolean }) => (
  <View style={styles.tabIcon}>
    <Text style={[styles.iconText, focused && styles.iconTextFocused]}>{icon}</Text>
  </View>
);

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textTertiary,
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tab.Screen
          name="Learn"
          component={LearnStack}
          options={{
            tabBarLabel: 'Learn',
            tabBarIcon: ({ focused }) => <TabIcon icon="📚" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Progress"
          component={ProgressScreen}
          options={{
            tabBarLabel: 'Progress',
            tabBarIcon: ({ focused }) => <TabIcon icon="📊" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ focused }) => <TabIcon icon="⚙️" focused={focused} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const ProgressScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderIcon}>📊</Text>
    <Text style={styles.placeholderTitle}>Your Progress</Text>
    <Text style={styles.placeholderText}>Coming soon!</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderIcon}>⚙️</Text>
    <Text style={styles.placeholderTitle}>Settings</Text>
    <Text style={styles.placeholderText}>Coming soon!</Text>
  </View>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    height: 85,
    paddingTop: 8,
    paddingBottom: 28,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  tabIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
    opacity: 0.5,
  },
  iconTextFocused: {
    opacity: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  placeholderIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  placeholderTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export { TopicsScreen, VocabularyScreen, QuizScreen };