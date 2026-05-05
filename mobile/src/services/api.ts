const API_BASE = 'http://localhost:8080/api';

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
}

export interface Question {
  id: string;
  topicId: string;
  content: string;
  options: string[];
  correctOptionIndex: number;
  imageUrl?: string;
}

export const api = {
  async getLanguages(): Promise<Language[]> {
    const response = await fetch(`${API_BASE}/languages`);
    const data = await response.json();
    return data.data || [];
  },

  async getTopicsByLanguage(languageId: string): Promise<Topic[]> {
    const response = await fetch(`${API_BASE}/topics/language/${languageId}`);
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

  async generateTest(topicId: string): Promise<Question[]> {
    const response = await fetch(`${API_BASE}/questions/generate-test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicId, questionCount: 5 }),
    });
    const data = await response.json();
    return data.data || [];
  },

  async submitTestResult(
    topicId: string,
    score: number,
    totalQuestions: number
  ): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE}/test-results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topicId, score, totalQuestions }),
    });
    const data = await response.json();
    return data;
  },
};