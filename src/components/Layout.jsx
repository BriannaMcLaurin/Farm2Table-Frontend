import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const { userRole } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Force the sidebar to be visible for farmers
  const isFarmer = userRole === 'farmer';

  return (
    <div className="layout">
      <Header 
        onToggleSidebar={toggleSidebar} 
        isSidebarCollapsed={isSidebarCollapsed} 
        showToggle={isFarmer}
        pageTitle={getPageTitle(location.pathname)}
      />
      <div className="content-wrapper">
        {isFarmer && (
          <Sidebar isCollapsed={isSidebarCollapsed} />
        )}
        <main className={`main-content ${!isFarmer ? 'no-sidebar' : ''} ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

const getPageTitle = (pathname) => {
  const titles = {
    '/': 'Home',
    '/dashboard': 'Dashboard',
    '/market': 'Market',
    '/market-insights': 'Market Insights',
    '/pricing': 'Pricing',
    '/order-table': 'Orders',
    '/profile': 'Profile',
    '/settings': 'Settings'
  };
  return titles[pathname] || 'Farm2Table';
};

export default Layout; 