import { useState, useEffect } from 'react';
import { Bell, Moon, Sun, User } from 'lucide-react';

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="header">
      <div className="header-left">
        {/* Placeholder for left items like breadcrumbs or search */}
      </div>
      <div className="header-right flex items-center gap-4">
        <button className="btn-icon" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button className="btn-icon" aria-label="Notifications">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-2" style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1rem', marginLeft: '0.5rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={20} />
          </div>
          <div className="flex-col">
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Admin User</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Superadmin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
