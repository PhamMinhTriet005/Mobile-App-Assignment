import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import API_BASE_URL from './config';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('sedu-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      try {
        // Dynamic import to break require cycle: client -> authStore -> auth -> client
        const { default: useAuthStore } = await import('../state/authStore');
        useAuthStore.getState().logout();
      } catch (e) {
        console.error('Failed to trigger logout from interceptor', e);
      }
    }
    return Promise.reject(error);
  }
);

export async function unwrap(promise) {
  const response = await promise;
  const payload = response?.data;
  if (!payload?.success) {
    const message = payload?.message || 'Request failed';
    throw new Error(message);
  }
  return payload.data;
}

export default api;
