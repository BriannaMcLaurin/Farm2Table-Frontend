import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Sidebar.css';

const Sidebar = ({ isCollapsed }) => {
  const { userRole } = useAuth();
  
  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/' },
    { icon: '🌾', label: 'Market Insights', path: '/market-insights' },
    { icon: '💰', label: 'Pricing', path: '/pricing' },
    { icon: '📦', label: 'Orders', path: '/order-table' },
    { icon: '👥', label: 'Profile', path: '/profile' },
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
    </aside>
  );
};

export default Sidebar; 