import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { logout as logoutApi } from '../api/auth';

const USER_KEY = 'sedu-user';
const TOKEN_KEY = 'sedu-token';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  initializing: true,
  setSession: async (session) => {
    const { token, ...user } = session || {};
    if (token) {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    }
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user || {}));
    set({ user: user || null, token: token || null });
  },
  clearSession: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
    set({ user: null, token: null });
  },
  hydrate: async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const userRaw = await AsyncStorage.getItem(USER_KEY);
    const user = userRaw ? JSON.parse(userRaw) : null;
    set({ user, token, initializing: false });
  },
  logout: async () => {
    const { token } = useAuthStore.getState();
    if (!token) return; // Already logged out or logging out

    try {
      await logoutApi();
    } catch (error) {
      console.warn('Backend logout failed', error);
      alert('Logout Error: ' + (error.message || 'The server could not delete your temporary guest account.'));
    }

    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
    set({ user: null, token: null });
  }
}));

export default useAuthStore;
