import { useEffect, useMemo, useState } from 'react';
import { Users, BookOpen, Crown, TrendingUp, Languages, CirclePlay } from 'lucide-react';
import { getAdminUsers, getLanguages, getQuestions, getSubscriptionPlans, getTopics, type BackendAdminUser, type BackendLanguage, type BackendQuestion, type BackendTopic } from '../api/backend';

function Dashboard() {
  const [languages, setLanguages] = useState<BackendLanguage[]>([]);
  const [topics, setTopics] = useState<BackendTopic[]>([]);
  const [questions, setQuestions] = useState<BackendQuestion[]>([]);
  const [users, setUsers] = useState<BackendAdminUser[]>([]);
  const [planCount, setPlanCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadOverview() {
      try {
        setLoading(true);
        const [languageData, topicData, questionData, userData, planData] = await Promise.all([
          getLanguages(),
          getTopics(),
          getQuestions(),
          getAdminUsers(),
          getSubscriptionPlans(),
        ]);

        if (cancelled) {
          return;
        }

        setLanguages(languageData);
        setTopics(topicData);
        setQuestions(questionData);
        setUsers(userData);
        setPlanCount(planData.length);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadOverview();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(() => ({
    totalUsers: users.length,
    premiumUsers: users.filter((user) => user.plan !== 'Free').length,
    contentItems: languages.length + topics.length + questions.length,
  }), [languages.length, questions.length, topics.length, users]);

  const latestTopics = topics.slice(0, 4);
  const latestUsers = users.slice(0, 4);

  return (
    <div>
      <div className="page-hero card mb-6">
        <div className="page-hero-copy">
          <span className="eyebrow">Dashboard</span>
          <h1>Backend-driven admin overview.</h1>
          <p>The dashboard now reads live counts from the Spring Boot API so the site reflects the current content and user state.</p>
        </div>
        <div className="page-hero-panel">
          <div>
            <strong>{planCount} subscription plans</strong>
            <span>From /api/v1/subscriptions/plans</span>
          </div>
          <div>
            <strong>{stats.totalUsers} users</strong>
            <span>From /api/admin/users</span>
          </div>
          <div>
            <strong>{stats.contentItems} content records</strong>
            <span>Languages, topics, questions</span>
          </div>
        </div>
      </div>

      <div className="stat-grid">
        <div className="card stat-card">
          <div className="stat-icon accent-blue"><Users size={24} /></div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <div className="value">{loading ? '...' : stats.totalUsers}</div>
            <div className="muted small">Live admin endpoint</div>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon accent-amber"><Crown size={24} /></div>
          <div className="stat-info">
            <h3>Premium Accounts</h3>
            <div className="value">{loading ? '...' : stats.premiumUsers}</div>
            <div className="muted small">Non-Free subscriptions</div>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon accent-emerald"><BookOpen size={24} /></div>
          <div className="stat-info">
            <h3>Content Records</h3>
            <div className="value">{loading ? '...' : stats.contentItems}</div>
            <div className="muted small">Languages, topics, questions</div>
          </div>
        </div>
      </div>

      <div className="split-layout">
        <div className="card">
          <div className="card-header-row">
            <div>
              <h2>Recent content</h2>
              <p className="muted">The latest topics and questions exposed by the backend.</p>
            </div>
            <button className="btn btn-primary">
              <TrendingUp size={16} /> Generate Report
            </button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Item</th>
                  <th>Source</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {latestTopics.map((topic) => (
                  <tr key={topic.id}>
                    <td>Topic</td>
                    <td>{topic.name}</td>
                    <td>{topic.languageId}</td>
                    <td><span className="badge badge-success">Published</span></td>
                  </tr>
                ))}
                {questions.slice(0, 2).map((question) => (
                  <tr key={question.id}>
                    <td>Question</td>
                    <td>{question.content}</td>
                    <td>{question.topicId}</td>
                    <td><span className="badge badge-primary">Live</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header-row">
            <div>
              <h2>Live signals</h2>
              <p className="muted">Quick actions backed by live data.</p>
            </div>
          </div>

          <div className="flex-col gap-2">
            <div className="badge badge-primary" style={{ width: 'fit-content' }}><Languages size={14} /> {languages.length} languages loaded</div>
            <div className="badge badge-warning" style={{ width: 'fit-content' }}><CirclePlay size={14} /> {questions.length} quiz questions loaded</div>
            <div className="badge badge-success" style={{ width: 'fit-content' }}><Users size={14} /> {latestUsers.length} users previewed</div>
            {latestUsers.map((user) => (
              <div key={user.id} className="helper-panel">
                <strong>{user.name}</strong>
                <p>{user.plan} · {user.provider} · {user.subscriptionActive ? 'active' : 'inactive'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
