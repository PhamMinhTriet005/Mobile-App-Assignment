export type ContentCategory = 'Language' | 'Topic' | 'Quiz';
export type SubscriptionPlan = 'Free' | 'Premium' | 'Enterprise';
export type AccountStatus = 'Active' | 'Inactive' | 'Pending';

export type ContentLanguage = {
  id: number;
  name: string;
  code: string;
  lessons: number;
  learners: string;
  status: 'Published' | 'Draft';
  accent: string;
};

export type ContentTopic = {
  id: number;
  name: string;
  language: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: number;
  status: 'Published' | 'Draft';
  updatedAt: string;
};

export type ContentQuiz = {
  id: number;
  name: string;
  topic: string;
  questions: number;
  passRate: string;
  status: 'Published' | 'Draft';
  updatedAt: string;
};

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  plan: SubscriptionPlan;
  status: AccountStatus;
  language: string;
  joinedAt: string;
  lastActive: string;
};

export const contentLanguages: ContentLanguage[] = [
  { id: 1, name: 'English', code: 'EN', lessons: 84, learners: '8.2k', status: 'Published', accent: '#0EA5E9' },
  { id: 2, name: 'French', code: 'FR', lessons: 52, learners: '3.8k', status: 'Published', accent: '#F97316' },
  { id: 3, name: 'Spanish', code: 'ES', lessons: 61, learners: '4.9k', status: 'Draft', accent: '#10B981' },
  { id: 4, name: 'Japanese', code: 'JP', lessons: 34, learners: '2.1k', status: 'Published', accent: '#8B5CF6' },
];

export const contentTopics: ContentTopic[] = [
  { id: 1, name: 'Grammar Essentials', language: 'English', difficulty: 'Beginner', lessons: 12, status: 'Published', updatedAt: '2026-05-02' },
  { id: 2, name: 'Travel Phrases', language: 'French', difficulty: 'Beginner', lessons: 8, status: 'Published', updatedAt: '2026-04-28' },
  { id: 3, name: 'Business Conversations', language: 'Spanish', difficulty: 'Intermediate', lessons: 10, status: 'Draft', updatedAt: '2026-05-07' },
  { id: 4, name: 'Kanji Foundations', language: 'Japanese', difficulty: 'Advanced', lessons: 14, status: 'Published', updatedAt: '2026-05-09' },
];

export const contentQuizzes: ContentQuiz[] = [
  { id: 1, name: 'Grammar Checkpoint', topic: 'Grammar Essentials', questions: 15, passRate: '82%', status: 'Published', updatedAt: '2026-05-03' },
  { id: 2, name: 'Airport Vocabulary', topic: 'Travel Phrases', questions: 10, passRate: '76%', status: 'Published', updatedAt: '2026-04-30' },
  { id: 3, name: 'Meeting Practice', topic: 'Business Conversations', questions: 12, passRate: '69%', status: 'Draft', updatedAt: '2026-05-08' },
  { id: 4, name: 'Kanji Review', topic: 'Kanji Foundations', questions: 20, passRate: '74%', status: 'Published', updatedAt: '2026-05-10' },
];

export const adminUsers: AdminUser[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', plan: 'Premium', status: 'Active', language: 'English', joinedAt: '2025-11-20', lastActive: '2 hours ago' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@example.com', plan: 'Free', status: 'Active', language: 'French', joinedAt: '2026-01-15', lastActive: '15 minutes ago' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', plan: 'Premium', status: 'Inactive', language: 'Spanish', joinedAt: '2025-08-05', lastActive: '4 days ago' },
  { id: 4, name: 'Diana Prince', email: 'diana.p@example.com', plan: 'Free', status: 'Active', language: 'Japanese', joinedAt: '2026-03-10', lastActive: '1 day ago' },
  { id: 5, name: 'Evan Wright', email: 'evan.w@example.com', plan: 'Premium', status: 'Pending', language: 'English', joinedAt: '2026-04-22', lastActive: 'Just now' },
  { id: 6, name: 'Fatima Ali', email: 'fatima.ali@example.com', plan: 'Enterprise', status: 'Active', language: 'French', joinedAt: '2026-04-17', lastActive: '6 hours ago' },
];
