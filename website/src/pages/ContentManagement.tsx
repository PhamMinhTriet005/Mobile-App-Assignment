import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { BookOpen, CirclePlay, Languages, PencilLine, Search, ShieldCheck, Sparkles, Save } from 'lucide-react';
import { getLanguages, getQuestions, getTopics, type BackendLanguage, type BackendQuestion, type BackendTopic } from '../api/backend';

type ContentCategory = 'Language' | 'Topic' | 'Quiz';

type ContentItem = {
  id: string;
  title: string;
  subtitle: string;
  status: 'Published' | 'Draft';
  details: Array<[string, string]>;
};

const categoryMeta: Record<ContentCategory, { label: string; icon: ReactNode; description: string }> = {
  Language: {
    label: 'Languages',
    icon: <Languages size={16} />,
    description: 'Manage language packs and see their live catalog metadata from the backend.',
  },
  Topic: {
    label: 'Topics',
    icon: <BookOpen size={16} />,
    description: 'Review topic names and language assignments stored in MongoDB.',
  },
  Quiz: {
    label: 'Quizzes',
    icon: <CirclePlay size={16} />,
    description: 'Question groups are rendered as quizzes so the admin UI tracks backend content coverage.',
  },
};

function formatLabel(value: string) {
  return value.replace(/_/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}

function ContentManagement() {
  const [category, setCategory] = useState<ContentCategory>('Language');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [draftTitle, setDraftTitle] = useState('');
  const [draftStatus, setDraftStatus] = useState('Published');
  const [languages, setLanguages] = useState<BackendLanguage[]>([]);
  const [topics, setTopics] = useState<BackendTopic[]>([]);
  const [questions, setQuestions] = useState<BackendQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadContent() {
      try {
        setLoading(true);
        const [languageData, topicData, questionData] = await Promise.all([
          getLanguages(),
          getTopics(),
          getQuestions(),
        ]);

        if (cancelled) {
          return;
        }

        setLanguages(languageData);
        setTopics(topicData);
        setQuestions(questionData);
        setSelectedId((currentId) => currentId || languageData[0]?.id || topicData[0]?.id || questionData[0]?.topicId || '');
        setError('');
      } catch (requestError) {
        if (!cancelled) {
          setError(requestError instanceof Error ? requestError.message : 'Failed to load content from the backend.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadContent();
    return () => {
      cancelled = true;
    };
  }, []);

  const languageLookup = useMemo(() => new Map(languages.map((language) => [language.id, language])), [languages]);
  const topicLookup = useMemo(() => new Map(topics.map((topic) => [topic.id, topic])), [topics]);

  const languageItems = useMemo<ContentItem[]>(() => languages.map((language) => ({
    id: language.id,
    title: language.name,
    subtitle: `${language.code} · language code from backend`,
    status: 'Published',
    details: [
      ['Code', language.code],
      ['Name', language.name],
      ['Collection', 'languages'],
    ],
  })), [languages]);

  const topicItems = useMemo<ContentItem[]>(() => topics.map((topic) => {
    const language = languageLookup.get(topic.languageId);
    return {
      id: topic.id,
      title: topic.name,
      subtitle: `${language?.name ?? 'Unknown language'} · languageId ${topic.languageId}`,
      status: 'Published',
      details: [
        ['Language', language?.name ?? topic.languageId],
        ['Language ID', topic.languageId],
        ['Topic name', topic.name],
      ],
    };
  }), [languageLookup, topics]);

  const quizItems = useMemo<ContentItem[]>(() => {
    const groupedQuestions = questions.reduce<Map<string, BackendQuestion[]>>((groups, question) => {
      const existingQuestions = groups.get(question.topicId) ?? [];
      groups.set(question.topicId, [...existingQuestions, question]);
      return groups;
    }, new Map());

    return Array.from(groupedQuestions.entries()).map(([topicId, topicQuestions]) => {
      const topic = topicLookup.get(topicId);
      const firstQuestion = topicQuestions[0];
      return {
        id: topicId,
        title: topic?.name ?? `Topic ${topicId}`,
        subtitle: `${topicQuestions.length} questions · generated from /api/questions`,
        status: topicQuestions.length > 2 ? 'Published' : 'Draft',
        details: [
          ['Topic', topic?.name ?? topicId],
          ['Questions', String(topicQuestions.length)],
          ['Sample prompt', firstQuestion?.content ?? 'No questions available'],
          ['Options on first question', String(firstQuestion?.options?.length ?? 0)],
        ],
      };
    });
  }, [questions, topicLookup]);

  const items = category === 'Language' ? languageItems : category === 'Topic' ? topicItems : quizItems;

  const filteredItems = useMemo(() => {
    const search = searchTerm.toLowerCase();
    return items.filter((item) => item.title.toLowerCase().includes(search) || item.subtitle.toLowerCase().includes(search));
  }, [items, searchTerm]);

  const selectedItem = filteredItems.find((item) => item.id === selectedId) ?? filteredItems[0];

  useEffect(() => {
    if (!selectedItem) {
      return;
    }

    setDraftTitle(selectedItem.title);
    setDraftStatus(selectedItem.status);
  }, [selectedItem]);

  return (
    <div>
      <div className="page-hero card mb-6">
        <div className="page-hero-copy">
          <span className="eyebrow">Content management</span>
          <h1>Live languages, topics, and quizzes from the backend.</h1>
          <p>The page reads directly from Mongo-backed endpoints so the admin view reflects the current catalog instead of a local fixture.</p>
        </div>
        <div className="page-hero-panel">
          <div>
            <strong>{languages.length} languages</strong>
            <span>Loaded from /api/languages</span>
          </div>
          <div>
            <strong>{topics.length} topics</strong>
            <span>Loaded from /api/topics</span>
          </div>
          <div>
            <strong>{questions.length} questions</strong>
            <span>Loaded from /api/questions</span>
          </div>
        </div>
      </div>

      {error && <div className="empty-state mb-6">{error}</div>}

      <div className="stat-grid">
        <div className="card stat-card">
          <div className="stat-icon accent-blue"><Languages size={24} /></div>
          <div className="stat-info">
            <h3>Languages</h3>
            <div className="value">{languages.length}</div>
            <div className="muted small">Records from the backend</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon accent-amber"><BookOpen size={24} /></div>
          <div className="stat-info">
            <h3>Topics</h3>
            <div className="value">{topics.length}</div>
            <div className="muted small">Grouped by language</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon accent-emerald"><ShieldCheck size={24} /></div>
          <div className="stat-info">
            <h3>Quizzes</h3>
            <div className="value">{quizItems.length}</div>
            <div className="muted small">Derived from question groups</div>
          </div>
        </div>
      </div>

      <div className="split-layout">
        <section className="card">
          <div className="card-header-row">
            <div>
              <h2>Content library</h2>
              <p className="muted">Toggle between live backend collections.</p>
            </div>
            <div className="chip-row">
              {(Object.keys(categoryMeta) as ContentCategory[]).map((itemCategory) => (
                <button
                  key={itemCategory}
                  className={`chip ${category === itemCategory ? 'chip-active' : ''}`}
                  onClick={() => {
                    setCategory(itemCategory);
                    const firstItemId = itemCategory === 'Language' ? languageItems[0]?.id : itemCategory === 'Topic' ? topicItems[0]?.id : quizItems[0]?.id;
                    setSelectedId(firstItemId ?? '');
                  }}
                >
                  {categoryMeta[itemCategory].icon}
                  {categoryMeta[itemCategory].label}
                </button>
              ))}
            </div>
          </div>

          <div className="toolbar">
            <div className="search-field">
              <Search size={18} />
              <input
                type="text"
                placeholder={`Search ${categoryMeta[category].label.toLowerCase()}...`}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <div className="toolbar-note">
              <Sparkles size={16} />
              {categoryMeta[category].description}
            </div>
          </div>

          {loading ? (
            <div className="empty-state">Loading content from the backend...</div>
          ) : (
            <div className="item-list">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  className={`item-row ${selectedId === item.id ? 'item-row-active' : ''}`}
                  onClick={() => setSelectedId(item.id)}
                >
                  <div>
                    <div className="item-title-row">
                      <strong>{item.title}</strong>
                      <span className={`badge ${item.status === 'Published' ? 'badge-success' : 'badge-warning'}`}>{item.status}</span>
                    </div>
                    <p>{item.subtitle}</p>
                  </div>
                  <PencilLine size={16} />
                </button>
              ))}
              {filteredItems.length === 0 && <div className="empty-state">No content matched your search.</div>}
            </div>
          )}
        </section>

        <aside className="card editor-card">
          <div className="card-header-row">
            <div>
              <h2>Editor</h2>
              <p className="muted">Edit the current backend record snapshot.</p>
            </div>
            <button className="btn btn-primary">
              <Save size={16} /> Save draft
            </button>
          </div>

          {selectedItem ? (
            <div className="editor-stack">
              <div>
                <label>Title</label>
                <input value={draftTitle} onChange={(event) => setDraftTitle(event.target.value)} />
              </div>
              <div className="grid-two">
                <div>
                  <label>Status</label>
                  <select value={draftStatus} onChange={(event) => setDraftStatus(event.target.value)}>
                    <option>Published</option>
                    <option>Draft</option>
                  </select>
                </div>
                <div>
                  <label>Category</label>
                  <input value={formatLabel(category)} readOnly />
                </div>
              </div>
              <div className="details-panel">
                {selectedItem.details.map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
              <div className="helper-panel">
                <strong>Data source</strong>
                <p>The page reads directly from the Spring Boot API, and the quiz cards are derived from the question collection because the backend does not expose a separate quiz entity.</p>
              </div>
            </div>
          ) : (
            <div className="empty-state">Pick an item to inspect.</div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default ContentManagement;
