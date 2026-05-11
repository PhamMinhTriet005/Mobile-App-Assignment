import { useEffect, useMemo, useState } from 'react';
import { Crown, Edit, Filter, Mail, Search, UserCog, Users } from 'lucide-react';
import { getAdminUsers, type BackendAdminUser } from '../api/backend';

const planOptions = ['All', 'Free', 'Premium Monthly', 'Premium Yearly'] as const;

function UsersList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState<(typeof planOptions)[number]>('All');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [draftName, setDraftName] = useState('');
  const [draftPlan, setDraftPlan] = useState('');
  const [users, setUsers] = useState<BackendAdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      try {
        setLoading(true);
        const userData = await getAdminUsers();
        if (cancelled) {
          return;
        }

        setUsers(userData);
        setSelectedUserId((currentId) => currentId || userData[0]?.id || '');
        setError('');
      } catch (requestError) {
        if (!cancelled) {
          setError(requestError instanceof Error ? requestError.message : 'Failed to load users from the backend.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadUsers();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch = user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search);
      const matchesPlan = planFilter === 'All' || user.plan === planFilter;
      return matchesSearch && matchesPlan;
    });
  }, [planFilter, searchTerm, users]);

  const selectedUser = filteredUsers.find((user) => user.id === selectedUserId) ?? filteredUsers[0];

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setDraftName(selectedUser.name);
    setDraftPlan(selectedUser.plan);
  }, [selectedUser]);

  return (
    <div>
      <div className="page-hero card mb-6">
        <div className="page-hero-copy">
          <span className="eyebrow">Users</span>
          <h1>Users and subscription plans from the backend.</h1>
          <p>The user list is powered by the Spring Boot admin endpoint so the dashboard reflects live account records rather than a local mock array.</p>
        </div>
        <div className="page-hero-panel compact">
          <div>
            <strong>{users.length} total users</strong>
            <span>Loaded from /api/admin/users</span>
          </div>
          <div>
            <strong>{users.filter((user) => user.plan !== 'Free').length} paid</strong>
            <span>Premium Monthly and Yearly</span>
          </div>
          <div>
            <strong>{users.filter((user) => user.subscriptionActive).length} active subs</strong>
            <span>Current plan state</span>
          </div>
        </div>
      </div>

      {error && <div className="empty-state mb-6">{error}</div>}

      <div className="stat-grid">
        <div className="card stat-card">
          <div className="stat-icon accent-blue"><Users size={24} /></div>
          <div className="stat-info">
            <h3>All users</h3>
            <div className="value">{users.length}</div>
            <div className="muted small">Admin-visible records</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon accent-amber"><Crown size={24} /></div>
          <div className="stat-info">
            <h3>Premium</h3>
            <div className="value">{users.filter((user) => user.plan !== 'Free').length}</div>
            <div className="muted small">Subscription backed</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon accent-emerald"><UserCog size={24} /></div>
          <div className="stat-info">
            <h3>Active plans</h3>
            <div className="value">{users.filter((user) => user.subscriptionActive).length}</div>
            <div className="muted small">From subscription lookup</div>
          </div>
        </div>
      </div>

      <div className="split-layout">
        <section className="card">
          <div className="card-header-row">
            <div>
              <h2>User list</h2>
              <p className="muted">Filter accounts and open a user record for editing.</p>
            </div>
            <button className="btn btn-outline">
              <Filter size={16} /> Advanced filter
            </button>
          </div>

          <div className="toolbar wrap">
            <div className="search-field wide">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <select value={planFilter} onChange={(event) => setPlanFilter(event.target.value as (typeof planOptions)[number])}>
              {planOptions.map((plan) => <option key={plan}>{plan}</option>)}
            </select>
          </div>

          {loading ? (
            <div className="empty-state">Loading users from the backend...</div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Plan</th>
                    <th>Role</th>
                    <th>Provider</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className={selectedUserId === user.id ? 'row-selected' : ''}
                      onClick={() => setSelectedUserId(user.id)}
                    >
                      <td>
                        <div className="user-cell">
                          <div className="avatar">{user.name.charAt(0)}</div>
                          <div>
                            <strong>{user.name}</strong>
                            <p>{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td><span className={`badge ${user.plan === 'Free' ? 'badge-success' : 'badge-warning'}`}>{user.plan}</span></td>
                      <td><span className="badge badge-primary">{user.role}</span></td>
                      <td>{user.provider}</td>
                      <td>{user.joinedAt}</td>
                      <td>
                        <button className="btn-icon" title="Edit">
                          <Edit size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="empty-cell">No users matched the current filters.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <aside className="card editor-card">
          <div className="card-header-row">
            <div>
              <h2>Selected user</h2>
              <p className="muted">Inspect the live account snapshot.</p>
            </div>
            <Mail size={18} />
          </div>

          {selectedUser ? (
            <div className="editor-stack">
              <div>
                <label>Name</label>
                <input value={draftName} onChange={(event) => setDraftName(event.target.value)} />
              </div>
              <div>
                <label>Email</label>
                <input value={selectedUser.email} readOnly />
              </div>
              <div className="grid-two">
                <div>
                  <label>Plan</label>
                  <select value={draftPlan} onChange={(event) => setDraftPlan(event.target.value)}>
                    <option>Free</option>
                    <option>Premium Monthly</option>
                    <option>Premium Yearly</option>
                  </select>
                </div>
                <div>
                  <label>Role</label>
                  <input value={selectedUser.role} readOnly />
                </div>
              </div>
              <div className="details-panel">
                <div>
                  <span>Provider</span>
                  <strong>{selectedUser.provider}</strong>
                </div>
                <div>
                  <span>Joined</span>
                  <strong>{selectedUser.joinedAt}</strong>
                </div>
                <div>
                  <span>Updated</span>
                  <strong>{selectedUser.updatedAt}</strong>
                </div>
                <div>
                  <span>Subscription</span>
                  <strong>{selectedUser.subscriptionActive ? 'Active' : 'Inactive'}</strong>
                </div>
              </div>
              <button className="btn btn-primary full-width">
                Save user profile
              </button>
            </div>
          ) : (
            <div className="empty-state">Select a user to inspect and edit.</div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default UsersList;
