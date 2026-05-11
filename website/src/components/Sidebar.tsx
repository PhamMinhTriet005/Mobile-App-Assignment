import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        S-Edu Admin
      </div>
      <nav className="sidebar-nav">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard />
          Dashboard
        </NavLink>
        <NavLink 
          to="/users" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Users />
          Users
        </NavLink>
        <NavLink 
          to="/content" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <BookOpen />
          Content
        </NavLink>
      </nav>
      <div className="sidebar-nav" style={{ flex: 0, borderTop: '1px solid var(--border-color)' }}>
        <a href="#" className="nav-item">
          <Settings />
          Settings
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
