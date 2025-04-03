import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isCollapsed }) => {
  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/' },
    { icon: '🌾', label: 'Market Insights', path: '/market-insights' },
    { icon: '💰', label: 'Pricing', path: '/pricing' },
    { icon: '📦', label: 'Orders', path: '/orders' },
    { icon: '👥', label: 'Profile', path: '/profile' },
    { icon: '📈', label: 'Analytics', path: '/analytics' },
    { icon: '⚙️', label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path} className="nav-item" title={isCollapsed ? item.label : ''}>
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="user-info">
          <img src="/default-avatar.svg" alt="User Avatar" className="avatar" />
          <div className="user-details">
            <span className="username">John Doe</span>
            <span className="role">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 