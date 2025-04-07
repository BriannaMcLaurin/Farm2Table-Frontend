import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ onToggleSidebar, isSidebarCollapsed, showToggle, pageTitle }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          {showToggle && (
            <button 
              className="toggle-sidebar"
              onClick={onToggleSidebar}
              aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isSidebarCollapsed ? '☰' : '←'}
            </button>
          )}
          <div className="logo">
            <img src="/favicon.svg" alt="Farm2Table Logo" className="header-logo" />
            <span className="logo-text">Farm2Table</span>
          </div>
          <h1 className="page-title">{pageTitle}</h1>
        </div>
        <div className="header-right">
          <nav className="header-nav">
            <ul>
              <li><a href="/market">🛒</a></li>
              <li><a href="/notifications">🔔</a></li>
              <li><a href="/help">❓</a></li>
            </ul>
          </nav>
          <div className="user-menu">
            <div 
              className="profile-link" 
              onClick={() => navigate('/profile')}
              style={{ cursor: 'pointer' }}
            >
              <img src="/default-avatar.svg" alt="User Avatar" className="avatar" />
              <span className="username">{currentUser?.email}</span>
            </div>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 