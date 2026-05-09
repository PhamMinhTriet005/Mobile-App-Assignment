import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuthStore from '../state/authStore';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import GuestScreen from '../screens/auth/GuestScreen';
import GoogleLoginScreen from '../screens/auth/GoogleLoginScreen';
import HomeScreen from '../screens/learning/HomeScreen';
import LanguageSelectScreen from '../screens/learning/LanguageSelectScreen';
import TopicListScreen from '../screens/learning/TopicListScreen';
import VocabularyListScreen from '../screens/learning/VocabularyListScreen';
import VocabularyDetailScreen from '../screens/learning/VocabularyDetailScreen';
import LessonScreen from '../screens/learning/LessonScreen';
import QuizScreen from '../screens/quiz/QuizScreen';
import QuizResultScreen from '../screens/quiz/QuizResultScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={token ? 'Home' : 'Login'}
      >
        {!token ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Guest" component={GuestScreen} />
            <Stack.Screen name="GoogleLogin" component={GoogleLoginScreen} />
          </>
        ) : null}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Languages" component={LanguageSelectScreen} />
        <Stack.Screen name="Topics" component={TopicListScreen} />
        <Stack.Screen name="VocabularyList" component={VocabularyListScreen} />
        <Stack.Screen name="VocabularyDetail" component={VocabularyDetailScreen} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="QuizResult" component={QuizResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
