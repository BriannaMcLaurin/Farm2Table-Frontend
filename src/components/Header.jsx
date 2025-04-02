import React from 'react';
import './Header.css';

const Header = ({ onToggleSidebar, isSidebarCollapsed }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="toggle-sidebar"
          onClick={onToggleSidebar}
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? '☰' : '←'}
        </button>
        <div className="logo">
          <img src="/logo.svg" alt="Farm2Table Logo" />
          <span>Farm2Table</span>
        </div>
      </div>
      <div className="header-right">
        <nav className="header-nav">
          <ul>
            <li><a href="/notifications">🔔</a></li>
            <li><a href="/help">❓</a></li>
          </ul>
        </nav>
        <div className="user-menu">
          <img src="/default-avatar.svg" alt="User Avatar" className="avatar" />
          <span className="username">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header; 