import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = 'http://192.168.1.28:8080/api';
const DEVICE_ID_KEY = 's-edu-device-id';

export interface Language {
  id: string;
  code: string;
  name: string;
}

export interface Topic {
  id: string;
  languageId: string;
  name: string;
}

export interface Vocabulary {
  id: string;
  topicId: string;
  word: string;
  meaning: string;
  type: string;
  imageUrl?: string;
  audioUrl?: string;
}

export interface Question {
  id: string;
  topicId: string;
  content: string;
  options: string[];
  correctOptionIndex: number;
  imageUrl?: string;
}

export interface TestResult {
  id: string;
  deviceId: string;
  topicId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
}

const getDeviceId = async (): Promise<string> => {
  const existing = await AsyncStorage.getItem(DEVICE_ID_KEY);
  if (existing) return existing;
  const generated = `device-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  await AsyncStorage.setItem(DEVICE_ID_KEY, generated);
  return generated;
};

export const api = {
  async getLanguages(): Promise<Language[]> {
    const response = await fetch(`${API_BASE}/languages`);
    const data = await response.json();
    return data.data || [];
  },

  async getAllTopics(): Promise<Topic[]> {
    const response = await fetch(`${API_BASE}/topics`);
    const data = await response.json();
    return data.data || [];
  },

  async getTopicsByLanguage(languageId: string): Promise<Topic[]> {
    const response = await fetch(`${API_BASE}/topics/language/${languageId}`);
    const data = await response.json();
    return data.data || [];
  },

  async getAllVocabularies(): Promise<Vocabulary[]> {
    const response = await fetch(`${API_BASE}/vocabularies`);
    const data = await response.json();
    return data.data || [];
  },

  async getVocabulariesByTopic(topicId: string): Promise<Vocabulary[]> {
    const response = await fetch(`${API_BASE}/vocabularies/topic/${topicId}`);
    const data = await response.json();
    return data.data || [];
  },

  async getQuestionsByTopic(topicId: string): Promise<Question[]> {
    const response = await fetch(`${API_BASE}/questions/topic/${topicId}`);
    const data = await response.json();
    return data.data || [];
  },

  async generateTest(topicId: string, numberOfQuestions = 5): Promise<Question[]> {
    const response = await fetch(`${API_BASE}/questions/generate-test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicId, numberOfQuestions }),
    });
    const data = await response.json();
    return data.data || [];
  },

  async submitTestResult(
    topicId: string,
    score: number,
    totalQuestions: number
  ): Promise<{ success: boolean; message: string }> {
    const deviceId = await getDeviceId();
    const response = await fetch(`${API_BASE}/test-results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, topicId, score, totalQuestions }),
    });
    const data = await response.json();
    return data;
  },

  async getTestHistory(): Promise<TestResult[]> {
    const deviceId = await getDeviceId();
    const response = await fetch(`${API_BASE}/test-results/device/${deviceId}`);
    const data = await response.json();
    return data.data || [];
  },
};